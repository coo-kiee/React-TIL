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
        default:
            break;
    };
};

export const AppService = {
    getDate,
};