import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { AppService } from './AppService';

const active = {
    background: 'yellow'
};

interface searchInfo {
    [key: string]: string | Array<string>,
    stDate: string,
    endDate: string,
    state: Array<string>,
    pay: Array<string>,
    searchText: string,
};

interface test {
    [key: string]: Array<string | boolean> | undefined,
    data: Array<string>,
    val?: Array<string>,
    isSelected: Array<boolean>,
}

interface menu {
    [key: string]: test,
    date: test,
    state: test,
    pay: test,
};

function App3() {

    // 선택메뉴
    const [menu, setMenu] = useState<menu>({
        date: {
            data: ['오늘', '어제', '최근7일', '당월', '전월'],
            // val: ['0', '1', '2', '3', '4'],
            isSelected: [true, false, false, false, false],
        },
        state: {
            data: ['전체', '완료', '취소', '진행중', '예약'],
            val: ['전체', '완료', '취소', '진행중', '예약'],
            isSelected: [false, false, false, false, false],
        },
        pay: {
            data: ['전체', '선불', '착불', '카드', '송금'],
            val: ['전체', '선불', '착불', '카드', '송금'],
            isSelected: [false, false, false, false, false],
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
                pay: {
                    ...prev.pay,
                    data: ['전체', '계약', '선불', '착불', '카드', '송금'],
                    val: ['전체', '계약', '선불', '착불', '카드', '송금'],
                    isSelected: [false, false, false, false, false, false],
                },
            }));
        };
    }, [isCompany]);

    // 검색조건
    const [searchInfo, setSearchInfo] = useState<searchInfo>({
        stDate: AppService.getDate(0),
        endDate: AppService.getDate(0),
        state: [],
        pay: [],
        searchText: '',
    });

    // 검색조건 선택
    const handleSearchCondition = (e: MouseEvent) => {

        const index = parseInt(e.currentTarget.getAttribute('data-index') as string);
        const menuType = e.currentTarget.getAttribute('data-menutype') as string;

        // 선택 버튼 활성화
        let isSelected = menu[menuType].isSelected;
        if (menuType === 'date' || index === 0) {
            isSelected.fill(false);
        } else {
            isSelected[0] = false;
        };

        isSelected[index] = !isSelected[index];
        // line 59 참조
        setMenu(prev => ({
            ...prev,
            [menuType]: {
                ...prev[menuType],
                isSelected,
            },
        }));

        // 날짜 변경
        if (menuType === 'date') {
            setSearchInfo(prev => ({ ...prev, stDate: AppService.getDate(index), endDate: AppService.getDate(0) }));
        };
    };
    
    // console.log(searchInfo);

    // 달력날짜 변경
    const handleCalendar = (e: ChangeEvent<HTMLInputElement>) => {
        
        const type = e.currentTarget.getAttribute('data-name');
        const selectedValue = (e.target as HTMLInputElement).value;

        // type 구분 && 날짜 유효성 검사
        if (type === 'stDate' && AppService.validateDate(selectedValue, searchInfo.endDate as string)) {
            setSearchInfo(prev => ({ ...prev, stDate: selectedValue }));
        }
        else if (type === 'endDate' && AppService.validateDate(searchInfo.stDate as string, selectedValue)) {
            setSearchInfo(prev => ({ ...prev, endDate: selectedValue }));
        }
        else {
            alert('날짜를 확인해주세요.');
        };
    };

    // 검색
    const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInfo(prev => ({
            ...prev,
            searchText: e.currentTarget.value,
        }));
    };

    // 제휴사 선택버튼 클릭
    const handleCompany = (e: MouseEvent<HTMLButtonElement>) => {

        let updateDate = menu;
        updateDate.state.isSelected.fill(false);
        updateDate.state.isSelected[0] = true;

        updateDate.pay.isSelected.fill(false);
        updateDate.pay.isSelected[1] = true;
        updateDate.pay.isSelected[2] = true;

        setMenu(prev => ({ ...updateDate }));

        handleSearch();
    };

    // 조회하기
    const handleSearch = () => {

        let updateData = searchInfo;
        
        Object.keys(menu).filter(item => item !== 'date').forEach((item) => {

            let arr: string[] = [];

            menu[item].isSelected.forEach((selected, index) => {
                selected && arr.push((menu[item].val as Array<string>)[index]);
            });
            updateData[item] = arr;
        });
        setSearchInfo(prev => ({ ...updateData }));
    };

    // 엑셀저장
    const hadleExcel  = () => {
        const table = document.getElementById('table') as HTMLElement;
        AppService.excelDownload(table);
    };

    return (
        <div className="App">
            {
                isCompany && <div><p>{'제휴사 > 올바로'}</p><button onClick={handleCompany}>제휴사 선택→</button></div>
            }
            <p>검색 <input onChange={handleInputText} value={searchInfo.searchText} /></p>
            <table id='table'>
                <tbody>
                    <tr>
                        <td>조회기간</td>
                        {menu.date.data.map((item, index) => <td key={item} style={menu.date.isSelected[index] ? active : undefined} onClick={handleSearchCondition} data-index={index} data-menutype="date" >{item}</td>)}
                        <td><input onChange={handleCalendar} data-name="stDate" type="date" value={searchInfo.stDate as string} /> ~ <input onChange={handleCalendar} data-name="endDate" type="date" value={searchInfo.endDate as string} /></td>
                    </tr>
                    <tr>
                        <td>조회구분</td>
                        {menu.state.data.map((item, index) => <td key={item} style={menu.state.isSelected[index] ? active : undefined} onClick={handleSearchCondition} data-index={index} data-menutype="state" >{item}</td>)}
                    </tr>
                    <tr>
                        <td>지급방식</td>
                        {menu.pay.data.map((item, index) => <td key={item} style={menu.pay.isSelected[index] ? active : undefined} onClick={handleSearchCondition} data-index={index} data-menutype="pay" >{item}</td>)}
                    </tr>
                </tbody>
            </table>
            <br />
            <button onClick={handleSearch}>조회하기</button>
            <button onClick={hadleExcel}>엑셀저장</button>
        </div>
    );
}

export default App3;
