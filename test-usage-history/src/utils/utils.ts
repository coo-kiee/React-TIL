import * as xlsx from 'xlsx';

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

// 엑셀 저장
interface excelDownload {
    (
        downloadDatas: HTMLElement | object | Array<any> | Array<HTMLElement | object | Array<any>>,
        types: string | Array<string>,
        options: xlsx.ColInfo[] | Array<xlsx.ColInfo[]>,
        title: string
    ): void
};
const excelDownload: excelDownload = (downloadDatas, types, options, title) => {
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
        const sheetName = index ? title + index : title;
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
    // title: '이용내역.xlsx'
    xlsx.writeFile(book, title);
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