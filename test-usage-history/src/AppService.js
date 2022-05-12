// 날짜 구하기
const getDate = (idx) => {

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
        // test 6개월
        case '5':
            return year + '-' + ("0" + (7 + month)).slice(-2) + "-01"
        default:
            break;
    };
};

// 날짜 유효성 검사
const validateDate = (type, date, pageInfo) => {
    
    let result = 0;
    if (type === 'stDate') {
        const stDate = new Date(date);
        const endDate = new Date(pageInfo.endDate);
        result = endDate - stDate;
    }
    else {
        const stDate = new Date(pageInfo.stDate);
        const endDate = new Date(date);
        result = endDate - stDate;
    };
};

export const AppService = {
    getDate,
    validateDate,
};