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
        options?:optios | Array<optios>,
        fileName?: string,
        sheetName?: string
    ): void
};

interface optios {
    sheet?: xlsx.Table2SheetOpts | xlsx.JSON2SheetOpts | xlsx.AOA2SheetOpts | Array<xlsx.Table2SheetOpts | xlsx.JSON2SheetOpts | xlsx.AOA2SheetOpts>,
    colspan?: xlsx.ColInfo[] | Array<xlsx.ColInfo[]>,
    merges?: number | string | xlsx.CellAddress | xlsx.Range[],
};

const excelDownload: excelDownload = (downloadDatas, types, options, fileName, sheetName = '') => {
    const book = xlsx.utils.book_new();

    // 엑셀 워크시트 추가함수
    const addSheet = (index?: number) => {
        let workSheet; // any
        let [downloadData, sheetOption, colspan, workSheetName] = [downloadDatas, (options as optios).sheet, (options as optios).colspan, ''];
            
            // 워크시트 여러개인 경우
        if (index) [downloadData, sheetOption, colspan, workSheetName] = [(downloadDatas  as Array<object | any[] | HTMLElement>)[index], (options as Array<optios>)[index].sheet, (options as Array<optios>)[index].colspan, sheetName? sheetName + (index + 1).toString() : (index + 1).toString()];
        const type = index ? types[index].toLowerCase() : types;
        switch (type) {
            case 'table':
                workSheet = xlsx.utils.table_to_sheet(downloadData as HTMLTableElement, sheetOption as xlsx.Table2SheetOpts);
                break;
            case 'array': // const file1 = [ ["이름", "나이"], ["장민우", "31"], ]
                workSheet = xlsx.utils.aoa_to_sheet(downloadData as Array<Array<any>>, sheetOption as xlsx.AOA2SheetOpts);
                break;
            case 'object': // const file2 = [ { A: "학과", B: "직급", C: "이름", D: "나이" }, { A: "흉부외과", B: "의사", C: "장민우", D: "31" }, ]
                workSheet = xlsx.utils.json_to_sheet(downloadData as Array<object>, sheetOption as xlsx.JSON2SheetOpts);
                break;
            default:
                return;
        };
        // 병합할 셀 영역 설정
        // if (options?.merges) workSheet['!merges'] = options.merges as xlsx.Range[]; 타입 수정 필요
        workSheet['!cols'] = colspan as xlsx.ColInfo[];
        // (workSheet as any)["!cols"] = index ? options[index] : options;
        sheetName = index as number > -1 ? sheetName + (index as number + 1) : sheetName
        xlsx.utils.book_append_sheet(book, workSheet, sheetName);
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

// 엑셀 저장 예시
// const hadleExcel = () => {
//     // 엑셀 헤더값, 키값
//     const exlcelInfo = {
//         headers: [
//             '순번', '주문일', '의뢰지', '부서 담당자', '출발지',
//             '출발동', '도착지', '도착동', '차량', '결제',
//             '기본요금', '할증요금', '대납요금', '합계요금', '완료일',
//             '운행기사', '주문타입', '비고', '진행상태'
//         ],
//         keys: [
//             'index', 'dt1', 'sODepart', 'sOManager', 'sSName',
//             'sStartDong', 'sDName', 'sDestDong', 'sCarType', 'sPayType',
//             'nChargeBasic', 'nChargeAdd', 'nChargeTrans', 'nChargeSum', 'dtFinal',
//             'sRName', 'sRcpType', 'sEtcMsg', 'sState'
//         ],
//     };

//     // 파일 이름
//     const dtStart = Utils.converDateFormat(searchInfo.dtStart, '-');
//     const dtEnd = Utils.converDateFormat(searchInfo.dtEnd, '-');
//     let userName = document.getElementsByClassName('member_nav')[0].getElementsByTagName('strong')[0].textContent as string;
//     if (userName.indexOf('(') > 0) userName = userName.slice(0, userName.indexOf('('));
//     const fileName = `${dtStart}_${dtEnd}_${userName ? userName : ''} 고객님`;

//     // 제목 Row
//     const titleRows = [[{ v: `${fileName} ${auth.info.account_owner} 이용내역서`, t: 's', s: { font: { bold: true, sz: 15 }, alignment: { vertical: "center", horizontal: "center" } } }], [''], ['']]; // 2 Rows 병합 예정

//     // 카테고리 Row
//     const headerRow: Array<any> = exlcelInfo.headers.map(header => {
//         // v: value, t: type, s: style
//         const headerData = { v: header, t: 's', s: { fill: { fgColor: { rgb: '808080' } }, alignment: { vertical: "center", horizontal: "center" } }, }
//         return headerData;
//     });

//     // 데이터 Row
//     const dataRows: Array<Array<string>> = (data as Array<object>).map((item: item, index) => {
//         const dataRow = exlcelInfo.keys.map(key => {
//             if (key === 'index') return (index + 1).toString();
//             else if (['dt1', 'dtFinal'].find(element => element === key)) return convertOrderDate(item[key]).join(' ');
//             else if (['nChargeBasic', 'nChargeAdd', 'nChargeTrans', 'nChargeSum'].find(element => element === key)) return Utils.numberComma(item[key]).toString();
//             else return item[key];
//         });
//         return dataRow;
//     });

//     // sheet, 셀 크기, 셀 병합 옵션
//     const options = {
//         sheet: { origin: "A3" }, // 해당 셀부터 표시
//         colspan: [
//             { wpx: 40 }, { wpx: 120 }, { wpx: 120 }, { wpx: 80 }, { wpx: 150 }, // A열, B열, C열, D열, E열
//             { wpx: 100 }, { wpx: 150 }, {wpx: 100}, { wpx: 80 }, { wpx: 50 }, // F열, G열, H열, I열, J열
//             { wpx: 60 }, { wpx: 80 }, { wpx: 60 }, {wpx: 80}, { wpx: 100 }, // K열, L열, M열, N열, O열
//             {wpx: 100}, {wpx: 60}, { wpx: 600 }, { wpx: 80 }, // P열, Q열, R열, S열
//         ],
//         merges: [{ s: { r: 2, c: 0 }, e: { r: 3, c: exlcelInfo.headers.length - 1 } }], // s = start, r = row, c=col, e= end
//     };
//     const totalRow = [...titleRows, headerRow, ...dataRows];
//     // 엑셀 파일 생성
//     dataRows.length > 0 && Utils.excelDownload(totalRow, 'array', options, fileName);
// };

// https://www.npmjs.com/package/xlsx-js-style

// let row1 = ["a", "b", "c"];
// let row2 = [1, 2, 3];
// let row3 = [
//     { v: 'Courier: 24', t: 's', s: { font: { name: 'Courier', sz: 24 }, fill: { fgColor: { rgb: 'E9E9E9' } } } },
//     { v: 'bold & color', t: 's', s: { font: { bold: true, color: { rgb: 'FF0000' } } } },
//     { v: 'fill: color', t: 's', s: { fill: { fgColor: { rgb: 'E9E9E9' } } } },
//     { v: 'line\nbreak', t: 's', s: { alignment: { wrapText: true } } },
// ]

// 셀 병합
// const merge = [
//     { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } },{ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
//   ];
//   ws["!merges"] = merge;
//   Use this code for merge A2:A3 ({ s: { r: 1, c: 0 }, e: { r: 2, c: 0 } }) and A4:A5 ({ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } })
  
//   Here s = start, r = row, c=col, e= end

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
        xPadding?: number,
    };
    */
    const downloadPdf2 = async (element: HTMLElement, fileName: string, pdfInfo?: pdfInfo, imgInfo?: imgInfo, option?: { [key: string]: any }) => {
        let { orientation = 'portrait', pdfUnit = 'mm', pdfFormat = 'a4', imgFormat = 'jpeg' } = pdfInfo ? pdfInfo : {};
        let { imgWidth = 210, pageHeight = 297, xPadding = 10 } = imgInfo ? imgInfo : {};

        const canvas = await html2canvas(element, option = { useCORS: true });

        // Calculate the number of pages.
        let totalHeight = canvas.height;   // 전체 이미지 높이
        let imgHeight = Math.floor(canvas.width * (pageHeight / imgWidth));   // 한 페이지에 담을 이미지 높이
        let nPages = Math.ceil(totalHeight / imgHeight);   // 페이지 개수 계산

        // Create a one-page canvas to split up the full image.   // 한 페이지용 캔버스 생성
        let pageCanvas = document.createElement('canvas');
        let pageCtx = pageCanvas.getContext('2d') as CanvasRenderingContext2D;
        pageCanvas.width = canvas.width;   // 기존 이미지 너비
        pageCanvas.height = imgHeight;   // 계산한 한 페이지 높이

        // Initialize the PDF.   // 한 페이지용 캔버스 생성
        let pdf = new jsPDF(orientation as pdfInfo['orientation'], pdfUnit as pdfInfo['pdfUnit'], pdfFormat as pdfInfo['pdfFormat']);
        let yPadding = xPadding;
        let innerPageWidth = imgWidth - xPadding * 2;
        let innerPageHeight = pageHeight - yPadding * 2;

        for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.   // 여러 페이지의 경우 마지막 페이지 캔버스 크기 수정
            if (page === nPages - 1 && totalHeight % imgHeight !== 0) {
                pageCanvas.height = totalHeight % imgHeight;
                innerPageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
            }

            // Display the page.   // 한 페이지 크기만 페이지용 캔버스에 그리기
            let w = pageCanvas.width;
            let h = pageCanvas.height;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(canvas, 0, page * imgHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.   // PDF에 페이지 추가
            if (page > 0) pdf.addPage();
            const imgData = pageCanvas.toDataURL('image/' + imgFormat);
            pdf.addImage(imgData, imgFormat, xPadding, xPadding, innerPageWidth, innerPageHeight);
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

// 전화번호 형식 변경 (ex. 01012345678 => 010-1234-5678)
const convertTelFormat = (x: any, exp:string) => {
    // 전화번호 체크 정규식
    const telRegExp = /^\d{8,12}$/;
    if(!telRegExp.test(x.toString())) return;

    // 휴대전화 && 인터넷전화 등 체크 정규식
    const phoneRegExp = /^0([1-9])([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
    const str = x.toString();

    switch (str.length) {
        case 8: {
            return [str.slice(0, 4), exp, str.slice(4, 8)].join('');
        }
        case 9: {
            return [str.slice(0, 2), exp, str.slice(2, 5), exp, str.slice(5)].join('');
        }
        case 10: {
            if(phoneRegExp.test(x.toString)) return [str.slice(0, 3), exp, str.slice(3, 6), exp, str.slice(6)].join('');
            return [str.slice(0, 2), exp, str.slice(2, 6), exp, str.slice(6)].join('');
        }
        case 11: {
            return [str.slice(0, 3), exp, str.slice(3, 7), exp, str.slice(7)].join('');
        }
        case 12: {
            return [str.slice(0, 4), exp, str.slice(4, 8), exp, str.slice(8)].join('');
        }
    };
};