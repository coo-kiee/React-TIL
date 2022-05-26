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

export type {
    defaultInfo,
    defaultInfo2,
    tableTitle,
    tableDatas,
    tableData,
    searchInfo,
};