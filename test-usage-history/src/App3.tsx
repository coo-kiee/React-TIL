import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { AppService } from './AppService';
import { menu, searchInfo3, searchInfo33 } from './type';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const example = {
    minWidth: '1080px',
    backgroundColor: '#fff',
    fontSize: '12px',
};

const row = {
    width: '4%',
};

const active = {
    background: 'yellow'
};

function App3() {
    
    // 선택메뉴
    const [menu, setMenu] = useState<menu>({
        date: {
            data: ['오늘', '어제', '최근7일', '당월', '전월'],
            isSelected: [true, false, false, false, false],
        },
        nType: {
            data: ['전체', '완료', '취소', '진행중', '예약'],
        },
        nPayType: {
            data: ['전체', '선불', '착불', '카드', '송금'],
            type: ['bAll', 'nPayType0', 'nPayType1', 'nPayType3', 'nPayType7'],
        },
    });

    // 제휴사 여부 - queryClient.getData로 대체 예정
    // const loginUser = queryClient.getData('user');
    const isCompany = true;

    // 제휴사 여부 확인
    useEffect(() => {
        if (isCompany) {
            setMenu(prev => ({
                ...prev,
                nPayType: {
                    data: ['전체', '계약', '선불', '착불', '카드', '송금'],
                    type: ['bAll', 'nPayType0', 'nPayType1', 'nPayType2', 'nPayType3', 'nPayType7'],
                },
            }));
        };
    }, [isCompany]);

    // 검색조건
    const [searchInfo, setSearchInfo] = useState<searchInfo3>({
        dtStart: AppService.getDate(0).dtStart,
        dtEnd: AppService.getDate(0).dtEnd,
        nCompany: 0,
        nCno: 0,
        nType: 0,
        bAll: 0,
        nPayType0: 0,
        nPayType1: 0,
        nPayType2: 0,
        nPayType3: 0,
        nPayType7: 0,
        sSearch: '',
        nResult: 0,
    });

    // 검색조건
    const [searchInfo2, setSearchInfo2] = useState<searchInfo33>({
        dtStart: AppService.getDate2(0).dtStart as Date,
        dtEnd: AppService.getDate2(0).dtEnd  as Date,
        nCompany: 0,
        nCno: 0,
        nType: 0,
        bAll: 0,
        nPayType0: 0,
        nPayType1: 0,
        nPayType2: 0,
        nPayType3: 0,
        nPayType7: 0,
        sSearch: '',
        nResult: 0,
    });

    // 검색조건 선택
    const handleSearchCondition = (e: MouseEvent) => {

        const index = parseInt(e.currentTarget.getAttribute('data-index') as string);
        const menuType = e.currentTarget.getAttribute('data-menutype') as string;

        if(!menuType) return;

        switch (menuType) {
            case 'date':
                let isSelected = menu.date.isSelected;
                isSelected.fill(false);
                isSelected[index] = !isSelected[index];
                setMenu(prev => ({
                    ...prev,
                    date: {
                        ...prev.date,
                        isSelected,
                    },
                }));
                // 날짜 변경
                // setSearchInfo(prev => ({ ...prev, ...AppService.getDate(index) }));
                setSearchInfo2(prev => ({ ...prev, ...AppService.getDate2(index) }));
                break;
            case 'nType':
                setSearchInfo(prev => ({ ...prev, nType: index }));
                break;
            case 'bAll':
                const bAll = searchInfo.bAll === 0 ? 1 : 0;
                setSearchInfo(prev => ({ ...prev, bAll, nPayType0: 0, nPayType1: 0, nPayType2: 0, nPayType3: 0, nPayType7: 0, }));
                break;
            // case nPayType0 ~ 7
            default:
                const value = searchInfo[menuType as keyof searchInfo3] === 0 ? 1 : 0;
                setSearchInfo(prev => ({ ...prev, [menuType]: value, bAll: 0, }));
                break;
        };
    };
    
    // console.log(searchInfo);

    // 달력날짜 변경
    const handleCalendar = (e: ChangeEvent<HTMLInputElement>) => {
        
        const type = e.currentTarget.getAttribute('data-name');
        const selectedValue = (e.target as HTMLInputElement).value;

        // type 구분 && 날짜 유효성 검사
        if (type === 'dtStart' && AppService.validateDate(selectedValue, searchInfo.dtEnd)) {
            setSearchInfo(prev => ({ ...prev, dtStart: selectedValue }));
        }
        else if (type === 'dtEnd' && AppService.validateDate(searchInfo.dtStart, selectedValue)) {
            setSearchInfo(prev => ({ ...prev, dtEnd: selectedValue }));
        }
        else {
            alert('날짜를 확인해주세요.');
        };
    };

    // 달력날짜 변경2
    const handleCalendar2 = (date:Date, type: string) => {
        
        // type 구분 && 날짜 유효성 검사
        if (type === 'dtStart' && AppService.validateDate2(date, searchInfo2.dtEnd)) {
            setSearchInfo2(prev => ({ ...prev, dtStart: date }));
        }
        else if (type === 'dtEnd' && AppService.validateDate2(searchInfo2.dtStart, date)) {
            setSearchInfo2(prev => ({ ...prev, dtEnd: date }));
        }
        else {
            alert('날짜를 확인해주세요.');
        };
    };

    // 검색
    const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {

        const sSearch = e.currentTarget.value;
        setSearchInfo(prev => ({
            ...prev,
            sSearch
        }));
    };

    // 제휴사 선택버튼 클릭
    const handleCompany = (e: MouseEvent<HTMLButtonElement>) => {

        setSearchInfo(prev => ({
            ...prev,
            type: 0,
            bAll: 0,
            nPayType0: 0,
            nPayType1: 1,
            nPayType2: 1,
            nPayType3: 0,
            nPayType7: 0,
        }));
    };

    // 조회하기
    const handleSearch = () => {

        console.log('조회하기');
        //axios
        console.log('searchInfo', searchInfo);
    };

    // 엑셀저장
    const hadleExcel  = () => {
        const table = document.getElementById('example') as HTMLElement;
        AppService.excelDownload(table);
    };

    return (
        <div className="App">
            {
                isCompany && <div><p>{'제휴사 > 올바로'}</p><button onClick={handleCompany}>제휴사 선택→</button></div>
            }
            <p>검색 <input onChange={handleInputText} value={searchInfo.sSearch} /></p>
            <table id='table'>
                <tbody>
                    <tr>
                        <td>조회기간</td>
                        {menu.date.data.map((item, index) => <td key={item} style={menu.date.isSelected[index] ? active : undefined} onClick={handleSearchCondition} data-index={index} data-menutype="date" >{item}</td>)}
                        <td><DatePicker onChange={(date) => handleCalendar2(date as Date, 'dtStart')} locale={ko} dateFormat="yyyy-MM-dd" selected={searchInfo2.dtStart} /></td>
                        <td>~</td>
                        <td><DatePicker onChange={(date) => handleCalendar2(date as Date, 'dtEnd')}  dateFormat="yyyy-MM-dd" selected={searchInfo2.dtEnd}/></td>
                        <td><input onChange={handleCalendar} data-name="dtStart" type="date" value={searchInfo.dtStart} /> ~ <input onChange={handleCalendar} data-name="dtEnd" type="date" value={searchInfo.dtEnd} /></td>
                    </tr>
                    <tr>
                        <td>조회구분</td>
                        {menu.nType.data.map((item, index) => <td key={item} style={searchInfo.nType === index ? active : undefined} onClick={handleSearchCondition} data-index={index} data-menutype="nType" >{item}</td>)}
                    </tr>
                    <tr>
                        <td>지급방식</td>
                        {menu.nPayType.data.map((item, index) => <td key={item} style={searchInfo[menu.nPayType.type[index] as keyof searchInfo3] === 1 ? active : undefined} onClick={handleSearchCondition} data-index={index} data-menutype={menu.nPayType.type[index]} >{item}</td>)}
                    </tr>
                </tbody>
            </table>
            <br />
            <button onClick={handleSearch}>조회하기</button>
            <button onClick={hadleExcel}>엑셀저장</button>
            <br />
            <br />
            <table id="example" className="table table-striped table-bordered th_color dataTable no-footer" style={example} role="grid">
                <thead>
                    <tr role="row">
                        <th className="sorting_disabled" rowSpan={1} colSpan={1} aria-label="순 번" style={row}>순 번</th>
                        <th className="sorting_desc" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="주 문 일: activate to sort column ascending" aria-sort="descending" style={row}>주 문 일</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="의 뢰 인: activate to sort column ascending" style={row}>의 뢰 인</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="출 발 지: activate to sort column ascending" style={row}>출 발 지</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="도 착 지: activate to sort column ascending" style={row}>도 착 지</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="차   종: activate to sort column ascending" style={row}>차   종</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="대   납: activate to sort column ascending" style={row}>대   납</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="운임내역: activate to sort column ascending" style={row}>운임내역</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="총 운 임: activate to sort column ascending" style={row}>총 운 임</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="결   제: activate to sort column ascending" style={row}>결   제</th>
                        <th className="sorting" tabIndex={0} aria-controls="example" rowSpan={1} colSpan={1} aria-label="비   고: activate to sort column ascending" style={row}>비   고</th>
                        <th className="sorting_disabled" rowSpan={1} colSpan={1} aria-label="진행상태" style={row}>진행상태</th></tr>
                </thead>
                <tbody>
                    <tr className="odd">
                        {/* rowSpan에 따라 엑셀 다운로드시 차지하는 row 수가 달라짐, colSpan도 마찬가지 */}
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                    </tr>
                    <tr className="odd">
                        {/* rowSpan에 따라 엑셀 다운로드시 차지하는 row 수가 달라짐, colSpan도 마찬가지 */}
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                        <td valign="top" rowSpan={1} className="dataTables_empty">검색된 결과값이 없습니다.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App3;
