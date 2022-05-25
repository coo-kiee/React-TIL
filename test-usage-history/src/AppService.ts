import * as xlsx from 'xlsx';

// 날짜 구하기
const getDate = (idx: number) => {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    switch (idx) {
        // 오늘
        case 0:
            return year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + date).slice(-2)
        // 어제
        case 1:
            return year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + (date - 1)).slice(-2)
        // 최근7일
        case 2:
            return year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + (date - 7)).slice(-2)
        // 당월
        case 3:
            return year + '-' + ("0" + (1 + month)).slice(-2) + "-01"
        // 전월
        case 4:
            return year + '-' + ("0" + (month)).slice(-2) + "-01"
        default:
            return "";
    };
};

// 날짜 유효성 검사
const validateDate = (stDate: string, endDate: string) => {
    
    const fromDate = new Date(stDate);
    const toDate = new Date(endDate);
    const maxPeriod = new Date(stDate);
    // 시작일로부터 6개월
    maxPeriod.setMonth(maxPeriod.getMonth() + 6);

    return fromDate < toDate && toDate < maxPeriod;
};

//
const excelDownload = (table: HTMLElement) => {
    const book = xlsx.utils.book_new();
    const data = xlsx.utils.table_to_sheet(table);

    xlsx.utils.book_append_sheet(book, data);

    xlsx.writeFile(book, '이용내역.xlsx');
};

export const AppService = {
    getDate,
    validateDate,
    excelDownload,
};