// 날짜 구하기
const getDate = (idx: string | null) => {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    switch (idx) {
        // 오늘
        case '0':
            return year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + date).slice(-2)
        // 어제
        case '1':
            return year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + (date - 1)).slice(-2)
        // 최근7일
        case '2':
            return year + '-' + ("0" + (1 + month)).slice(-2) + '-' + ("0" + (date - 7)).slice(-2)
        // 당월
        case '3':
            return year + '-' + ("0" + (1 + month)).slice(-2) + "-01"
        // 전월
        case '4':
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
    maxPeriod.setMonth(maxPeriod.getMonth() + 6);

    // 시작날짜 < 마지막날짜 && 6개월 이내 확인
    if(fromDate < toDate && toDate < maxPeriod) {
        return true;
    };

    return false;
    
};

export const AppService = {
    getDate,
    validateDate,
};