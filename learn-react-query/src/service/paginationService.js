import { useState } from "react";

// F.E에서 Data로 Pagination 구현
const prop = { data: [] };
const data = prop.data;

// 페이지 정보
const [pagination, setPagination] = useState({
    startPage: 1,
    endPage: 10,
    currentPage: 1,
    viewPageCnt: 5, // 페이지 화면 노출 개수
    size: 10, // 이용내역 리스트 개수
    maxPage: 10,
});

// 페이지 개수 구하기
useEffect(() => {
    const dataCnt = data.length;
    const maxPage = Math.ceil(dataCnt / pagination.size);
    // 페이지 화면 노출 개수
    const viewPageCnt = pagination.viewPageCnt;
    // 끝 페이지 노출 기준점
    const viewPoint = (pagination.maxPage - (viewPageCnt - 1)) < 1 ? 1 : (pagination.maxPage - (viewPageCnt - 1));
    const startPage = (pagination.currentPage - Math.floor(viewPageCnt / 2)) > viewPoint ? viewPoint : (pagination.currentPage - Math.floor(viewPageCnt / 2));
    const endPage = (pagination.currentPage + Math.floor(viewPageCnt / 2)) > viewPageCnt ? (pagination.currentPage + Math.floor(viewPageCnt / 2)) : viewPageCnt;

    setPagination(prev => ({ ...prev, maxPage, startPage, endPage }));
}, [])

// 페이지네이션
const getPages = () => {

    const pageArr = Array.from({ length: pagination.maxPage }, (value, index) => index + 1);
    
    return pageArr.map(pageNum => {
        if (pageNum >= pagination.startPage && pageNum <= pagination.endPage) return pageNum;
        return
    });
};
 
// 이전/다음 페이지 이동
const handleArrowButton = (e) => {
    const className = e.currentTarget.className;
    let changePage = 0;

    if (className.includes('prev')) {
        changePage = pagination.currentPage - pagination.size;
        changePage = changePage < 1 ? 1 : changePage;
    }
    else if (className.includes('next')) {
        changePage = pagination.currentPage + pagination.size;
        changePage = changePage > pagination.maxPage ? pagination.maxPage : changePage;
    };
    setPagination(prev => ({ ...prev, currentPage: changePage }));
};

export const PaginationService = {
    getPages
};