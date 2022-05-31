import * as xlsx from 'xlsx';

// 날짜 구하기
const getDate = (idx: number) => {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    let dtStart = '';
    let dtEnd = year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + date).slice(-2);

    switch (idx) {
        // 오늘
        case 0:
            dtStart = year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + date).slice(-2);
            return { dtStart, dtEnd };
        // 어제
        case 1:
            dtStart = year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + (date - 1)).slice(-2);
            return { dtStart, dtEnd };
        // 최근7일
        case 2:
            dtStart = year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + (date - 7)).slice(-2);
            return { dtStart, dtEnd };
        // 당월
        case 3:
            dtStart = year + '-' + ("0" + (1 + month)).slice(-2) + "-01";
            return { dtStart, dtEnd };
        // 전월
        case 4:
            dtStart = year + '-' + ("0" + (month)).slice(-2) + "-01";
            const prevMonthDate = new Date(year, month, 0);
            dtEnd = year + '-' + ("0" + (month)).slice(-2) + '-' + prevMonthDate.getDate();
            return { dtStart, dtEnd };
        default:
            return { dtStart, dtEnd };
    };
};

// 날짜 구하기2
const getDate2 = (idx: number) => {

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
            dtStart = new Date(year, month , date - 1);
            return { dtStart, dtEnd: now };
        // 최근7일
        case 2:
            dtStart = new Date(year, month , date - 1);
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
            return { };
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
    getDate2,
    validateDate,
    excelDownload,
};