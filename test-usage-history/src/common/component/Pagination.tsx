import { MouseEventHandler, useEffect, useState } from "react";

interface pagination {
    startPage: number,
    endPage: number,
    maxPage: number,
};

interface props {
    [key: string]: any
    dataCnt: number,
    pageInfo: {
        row?: number, // 한 페이지에 나오는 리스트 개수
        currentPage: number, 
        boundaryRange?: number // 화면에 노출되는 페이지 번호 개수
    },
    handlePageChange: Function // 상위 컴포넌트 현재 페이지 변경 함수
};

const Pagination = (props: props) => {

    const { dataCnt, handlePageChange } = props;
    const { row = 10, currentPage, boundaryRange = 5 } = props.pageInfo;

    // 페이지 정보
    const [pagination, setPagination] = useState<pagination>({
        startPage: 1,
        endPage: 1,
        maxPage: 1,
    });
    
    // 페이지 계산
    const paginate = (dataCnt: number) => {
        const maxPage = Math.ceil(dataCnt / row);
        // 끝 페이지 노출 기준점
        const viewPoint = (pagination.maxPage - (boundaryRange - 1)) < 1 ? 1 : (pagination.maxPage - (boundaryRange - 1));
        const startPage = (currentPage - Math.floor(boundaryRange / 2)) > viewPoint ? viewPoint : (currentPage - Math.floor(boundaryRange / 2));
        const endPage = (currentPage + Math.floor(boundaryRange / 2)) > boundaryRange ? (currentPage + Math.floor(boundaryRange / 2)) : boundaryRange;
        return { maxPage, startPage, endPage };
    };
    
    // 페이지 계산 후 정보수정
    useEffect(() => {
        const { maxPage, startPage, endPage } = paginate(dataCnt);
        setPagination(prev => ({ ...prev, maxPage, startPage, endPage }));
    }, [dataCnt, currentPage, boundaryRange, row]);

    // 계산 후 페이지 배열 생성
    const pageArr = Array.from({ length: pagination.maxPage }, (value, index: number) => index + 1);

    // 페이지 번호 클릭
    const handlePage: MouseEventHandler<HTMLButtonElement> = (e) => {
        const changePage = parseInt(e.currentTarget.innerText);
        handlePageChange(changePage);
    };
    
    // 이전/다음 페이지 이동
    const handleArrowButton: MouseEventHandler<HTMLButtonElement> = (e) => {
        const className = e.currentTarget.className;
        let changePage = 0;

        if (className.includes('prev')) {
            changePage = currentPage - boundaryRange;
            changePage = changePage < 1 ? 1 : changePage;
        }
        else if (className.includes('next')) {
            changePage = currentPage + boundaryRange;
            changePage = changePage > pagination.maxPage ? pagination.maxPage : changePage;
        };
        handlePageChange(changePage);
    };

    return (
        <>
            {
                !!dataCnt &&
                <>
                    <button type="button" className="btn_prev" onClick={handleArrowButton} disabled={currentPage === 1}></button>  {/* <!-- disabled : 비활성화 --> */}
                    {
                        pageArr.map(pageNum => {
                            if (pageNum >= pagination.startPage && pageNum <= pagination.endPage) return <button key={pageNum} onClick={handlePage} type="button" className={currentPage === pageNum ? "active" : ""} disabled={currentPage === pageNum}>{pageNum}</button>
                            return
                        })
                    }
                    <button type="button" className="btn_next" onClick={handleArrowButton} disabled={pagination.maxPage === 0 || currentPage === pagination.maxPage}></button>  {/* <!-- disabled : 비활성화 --> */}
                </>
            }
        </>
    );
};

export default Pagination;