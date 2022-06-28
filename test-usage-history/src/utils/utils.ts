import * as xlsx from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// 3자리마다 콤마 금액 표시
const numberComma = (charge: string | number) => {

    charge = charge.toString();
    const len = charge.length;
    if (len < 4) return charge;

    // return charge.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    return charge.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

export const Utils = {
    numberComma,
};

// 날짜 변환(String to Date)
const convertStringToDateFormat = (str:string, exp:string) => {
    let timestamp = Date.parse(str)
    if (isNaN(timestamp) === true) return str

    const strDate = new Date(str)
    // const localDate = new Date(strDate.getTime() + strDate.getTimezoneOffset() * 60 * 1000)

    const year = strDate.getFullYear()
    const month = strDate.getMonth() + 1 < 10 ? '0' + (strDate.getMonth() + 1) : '' + (strDate.getMonth() + 1)
    const date = strDate.getDate() < 10 ? '0' + strDate.getDate() : '' + strDate.getDate()
    return year + exp + month + exp + date
};

// 엑셀 저장
interface excelDownload {
    (
        downloadDatas: HTMLElement | object | Array<any> | Array<HTMLElement | object | Array<any>>,
        types: string | Array<string>,
        options: xlsx.ColInfo[] | Array<xlsx.ColInfo[]>,
        title: string
    ): void
};
const excelDownload: excelDownload = (downloadDatas, types, options, fileName) => {
    const book = xlsx.utils.book_new();

    // 엑셀 워크시트 추가함수
    const addSheet = (index?: number) => {
        let exelData; // any
        const type = index ? types[index].toLowerCase() : types;
        const downloadData = index ? (downloadDatas as Array<object | any[] | HTMLElement>)[index] : downloadDatas;
        switch (type) {
            case 'table':
                exelData = xlsx.utils.table_to_sheet(downloadData as HTMLTableElement);
                break;
            case 'array': // const file1 = [ ["이름", "나이"], ["장민우", "31"], ]
                exelData = xlsx.utils.aoa_to_sheet(downloadData as Array<Array<any>>);
                break;
            case 'object': // const file2 = [ { A: "학과", B: "직급", C: "이름", D: "나이" }, { A: "흉부외과", B: "의사", C: "장민우", D: "31" }, ]
                exelData = xlsx.utils.json_to_sheet(downloadData as Array<object>);
                break;
            default:
                return;
        };
        (exelData as any)["!cols"] = index ? options[index] : options;
        const sheetName = index ? fileName + index : fileName;
        xlsx.utils.book_append_sheet(book, exelData, sheetName);
    };

    // 워크시트 추가
    if ((downloadDatas as Array<object | any[] | HTMLElement>).length > 1) {
        (downloadDatas as Array<object | any[] | HTMLElement>).forEach((downloadData, index) => {
            addSheet(index);
        });
    }
    else {
        addSheet();
    };
    // fileName: '이용내역'
    xlsx.writeFile(book, fileName);
};

// 날짜 구하기
const getDate = (idx: number) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    let dtStart = now;

    switch (idx) {
        // 오늘
        case 0:
            return { dtStart: now, dtEnd: now };
        // 어제
        case 1:
            dtStart = new Date(year, month, date - 1);
            return { dtStart, dtEnd: dtStart };
        // 최근7일
        case 2:
            dtStart = new Date(year, month, date - 7);
            return { dtStart, dtEnd: now };
        // 당월
        case 3:
            dtStart = new Date(year, month, 1);
            return { dtStart, dtEnd: now };
        // 전월
        case 4:
            dtStart = new Date(year, month - 1, 1);
            const dtEnd = new Date(year, month, 0);
            return { dtStart, dtEnd };
        default:
            return {};
    };
};

// 날짜 유효성 검사
const validateDate = (stDate: Date, endDate: Date, period: number) => {
    const maxPeriod = new Date(stDate);
    // 최대 조회기간
    maxPeriod.setMonth(maxPeriod.getMonth() + period);
    const validation = stDate < endDate && endDate < maxPeriod;

    return validation;
};

// pdf 다운로드
// https://devlink.tistory.com/242
// https://www.wake-up-neo.com/ko/javascript/html2canvas%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%88%A8%EA%B2%A8%EC%A7%84-div%EC%9D%98-%EC%8A%A4%ED%81%AC%EB%A6%B0-%EC%83%B7/1044322649/
interface pdfInfo {
    orientation?: "portrait" | "p" | "l" | "landscape" | undefined, // 'landscape - 가로, 'portrait - 세로
    pdfUnit?: "mm" | "pt" | "px" | "in" | "cm" | "ex" | "em" | "pc" | undefined,
    pdfFormat?: string | number[] | undefined,
    imgFormat?: 'png',
};
interface imgInfo {
    imgWidth?: number, // imgWidth - 이미지 가로 길이(mm) A4 기준
    pageHeight?: number, // pageHeight - 출력 페이지 세로 길이 A4 기준
    xPadding?: number,
};
const downloadPdf = async (element: HTMLElement, fileName: string, pdfInfo?: pdfInfo, imgInfo?: imgInfo, option?: { [key: string]: any }) => {
    let { orientation = 'portrait', pdfUnit = 'mm', pdfFormat = 'a4', imgFormat = 'jpeg' } = pdfInfo ? pdfInfo : {};
    let { imgWidth = 210, pageHeight = 270, xPadding = 10 } = imgInfo ? imgInfo : {};

    const canvas = await html2canvas(element, ...option as any)
    const imgData = canvas.toDataURL('image/' + imgFormat);
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let totalHeight = imgHeight; // 전체 이미지 크기
        let position = xPadding;
        
        let pdf = new jsPDF(orientation as pdfInfo['orientation'], pdfUnit as pdfInfo['pdfUnit'], pdfFormat as pdfInfo['pdfFormat']); 
        pdf.addImage(imgData, imgFormat, xPadding, position, imgWidth, imgHeight);
    
        totalHeight -= pageHeight; // 남은 이미지 크기 계산
    
        // 여러 페이지일 경우
        while(totalHeight >= 20) {
            position = totalHeight - imgHeight;
            pdf.addPage()
            pdf.addImage(imgData, 'jpeg', xPadding, position, imgWidth, imgHeight);
            totalHeight -= pageHeight;
        };
        pdf.save(fileName);
};

// PDF 다운로드 여러개까지 이미지 안겹치고 되는거!! 진짜!!
// https://github.com/parallax/jsPDF/issues/1893
    /* Parameter
    interface pdfInfo {
        orientation?: "portrait" | "p" | "l" | "landscape" | undefined, // 'landscape - 가로, 'portrait - 세로
        pdfUnit?: "mm" | "pt" | "px" | "in" | "cm" | "ex" | "em" | "pc" | undefined,
        pdfFormat?: string | number[] | undefined,
        imgFormat?: 'png',
    };
    interface imgInfo {
        imgWidth?: number, // imgWidth - 이미지 가로 길이(mm) A4 기준 297
        pageHeight?: number, // pageHeight - 출력 페이지 세로 길이 A4 기준 210
        margin?: number,
    };
    */
    const downloadPdf2 = async (element: HTMLElement, fileName: string, pdfInfo?: pdfInfo, imgInfo?: imgInfo, option?: { [key: string]: any }) => {
        let { orientation = 'portrait', pdfUnit = 'mm', pdfFormat = 'a4', imgFormat = 'jpeg' } = pdfInfo ? pdfInfo : {};
        let { imgWidth = 210, pageHeight = 297, xPadding = 10 } = imgInfo ? imgInfo : {};

        const canvas = await html2canvas(element, option);
        let innerPageWidth = imgWidth - xPadding * 2;
        let innerPageHeight = pageHeight - xPadding * 2;

        // Calculate the number of pages.
        let totalHeight = canvas.height; // 전체 크기
        let imgHeight = Math.floor(canvas.width * (pageHeight / imgWidth));  // 한 페이지에 담을 canvas 높이
        let nPages = Math.ceil(totalHeight / imgHeight); 

        // Define pageHeight separately so it can be trimmed on the final page.
        pageHeight = innerPageHeight;

        // Create a one-page canvas to split up the full image.
        let pageCanvas = document.createElement('canvas');
        let pageCtx = pageCanvas.getContext('2d') as CanvasRenderingContext2D;
        pageCanvas.width = canvas.width;
        pageCanvas.height = imgHeight;

        // Initialize the PDF.
        let pdf = new jsPDF(orientation as pdfInfo['orientation'], pdfUnit as pdfInfo['pdfUnit'], pdfFormat as pdfInfo['pdfFormat']); 

        for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && totalHeight % imgHeight !== 0) {
                pageCanvas.height = totalHeight % imgHeight;
                pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
            }

            // Display the page.
            let w = pageCanvas.width;
            let h = pageCanvas.height;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(canvas, 0, page * imgHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page > 0) pdf.addPage();
            const imgData = pageCanvas.toDataURL('image/' + imgFormat);
            pdf.addImage(imgData, imgFormat, xPadding, xPadding, innerPageWidth, pageHeight);
        }
        pdf.save(fileName);
    };

/* ReactQuery PDF 다운로드 예제
const pdfRef = useRef(null);
    
    // 1 영수증 다운로드
    useEffect(() => {
        if (!isLoading) {
            const element = pdfRef?.current;
            const pdfDownload = async (element: HTMLElement) => {
                await Utils.downloadPdf(element, 'test', {}, { imgWidth: 135, pageHeight: 270 });
                handleRecipt(false);
            };
            element && pdfDownload(element);
        };
    }, [isLoading]);

    // 2 테이블 다운로드
    useEffect(() => {
        if (isPDF && !isLoading) { //isPDF - 페이지네이션용 / PDF용 구분
            const element = pdfRef?.current;
            const pdfDownload = async (element: HTMLElement) => {
                await Utils.downloadPdf(element, '이용내역', { orientation: 'landscape' }, { imgWidth: 297, pageHeight: 210 });
                handlePDF(false);
            };
            element && pdfDownload(element);
        };
    }, [isLoading]);
*/
