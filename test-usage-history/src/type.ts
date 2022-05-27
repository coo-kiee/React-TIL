interface defaultInfo {
    tableTitles: Array<tableTitle>,
    tableDatas: tableDatas
};

interface defaultInfo2 {
    [key: string]: string | number | Array<string | boolean>,
    id: number,
    menuType: string,
    name: string,
    menu: Array<string>,
    val: Array<string>,
    isSelected: Array<boolean>,
};

interface tableTitle {
    menuType: string,
    name: string,
};

interface tableDatas {
    [key: string]: tableData,
};

interface tableData {
    menu: Array<string>,
    val: Array<string>,
    isSelected: Array<boolean>,
};

interface searchInfo {
    [key: string]: string | Array<string>,
    stDate: string,
    endDate: string,
    state: Array<string>,
    pay: Array<string>,
    searchText: string,
};

interface searchInfo3 {
    // [key: string]: string | number
    dtStart: string,
    dtEnd: string,
    nType: number,
    bAll: number,
    nCompany: number,
    nCno: number,
    nPayType0: number,
    nPayType1: number,
    nPayType2: number,
    nPayType3: number,
    nPayType7: number,
    sSearch: string,
    nResult: number,
};

interface test {
    // [key: string]: Array<string | boolean> | undefined,
    data: Array<string>,
    type?: Array<string>,
    isSelected?: Array<boolean>,
}

interface menu {
    // [key: string]: test,
    date: {
        data: Array<string>,
        isSelected: Array<boolean>,
    },
    nType: {
        data: Array<string>,
    },
    nPayType: {
        data: Array<string>,
        type: Array<string>,
    },
};

export type {
    defaultInfo,
    defaultInfo2,
    tableTitle,
    tableDatas,
    tableData,
    searchInfo,
    searchInfo3,
    menu,
};