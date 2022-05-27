import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { AppService } from './AppService';
import { defaultInfo, searchInfo } from './type';

const active = {
  background: 'yellow'
};

function App2() {

  // 제휴사 여부 - useQuery로 로그인 유저정보로 대체 예정
  // const loginUser = queryClient.getData('user');
  const [isCompany, setIsCompany] = useState(true);
  
  // 제휴사 여부 확인
  useEffect(() => {
    
    // if (loginUser.isCompany)
    if (isCompany) {
      setIsCompany(prev => true);
      setDefaultInfo(prev => ({
        ...prev,
        tableDatas: {
          ...prev.tableDatas,
          pay: {
            ...prev.tableDatas.pay,
            menu: ['전체', '계약', '선불', '착불', '카드', '송금'],
            val: ['전체', '계약', '선불', '착불', '카드', '송금'],
            isSelected: [false, false, false, false, false, false],
          },
        }
      }));
    };

  }, [isCompany]);

  // 검색메뉴
  const [defaultInfo, setDefaultInfo] = useState<defaultInfo>({
    tableTitles: [{ menuType: 'date', name: '조회기간' }, { menuType: 'state', name: '조회구분' }, { menuType: 'pay', name: '지급방식' }],
    tableDatas: {
      date: {
        menu: ['오늘', '어제', '최근7일', '당월', '전월'],
        val: ['0', '1', '2', '3', '4'],
        isSelected: [true, false, false, false, false],
      },
      state: {
        menu: ['전체', '완료', '취소', '진행중', '예약'],
        val: ['전체', '완료', '취소', '진행중', '예약'],
        isSelected: [false, false, false, false, false],
      },
      pay: {
        menu: ['전체', '선불', '착불', '카드', '송금'],
        val: ['전체', '선불', '착불', '카드', '송금'],
        isSelected: [false, false, false, false, false],
      },
    },
  });

  // 검색조건
  const [searchInfo, setSearchInfo] = useState<searchInfo>({
    stDate: AppService.getDate(0).dtStart,
    endDate: AppService.getDate(0).dtEnd,
    state: [],
    pay: [],
    searchText: '',
  });

  // 검색조건 선택
  const handleSearchCondition = (e: MouseEvent) => {

    const index = parseInt(e.currentTarget.getAttribute('data-index') as string);
    const menuType = e.currentTarget.getAttribute('data-menutype') as string;
    let isSelected = defaultInfo.tableDatas[menuType].isSelected;
    
    if (menuType === 'date' || index === 0) {
      isSelected.fill(false);
    } else {
      isSelected[0] = false;
    };

    isSelected[index] = !isSelected[index];
    setDefaultInfo(prev => ({
      ...prev,
      tableDatas: {
        ...prev.tableDatas,
        [menuType]: {
          ...prev.tableDatas[menuType],
          isSelected: isSelected,
        }
      },
    }));
    
    if(menuType === 'date') {
      setSearchInfo(prev => ({ ...prev, ...AppService.getDate(index)}));
    };
  };

  // console.log('defaultInfo', defaultInfo);
//   console.log('defaultInfo2', defaultInfo2);
  // console.log('searchInfo', searchInfo);

  // 달력날짜 변경
  const handleCalendar = (e: ChangeEvent<HTMLInputElement>) => {

    const name = e.currentTarget.getAttribute('data-name');
    const selectedValue = (e.target as HTMLInputElement).value;

    // type 구분 && 날짜 유효성 검사
    if (name === 'stDate' && AppService.validateDate(selectedValue, searchInfo.endDate as string)) {
      setSearchInfo(prev => ({ ...prev, stDate: selectedValue }));
    }
    else if (name === 'endDate' && AppService.validateDate(searchInfo.stDate as string, selectedValue)) {
      setSearchInfo(prev => ({ ...prev, endDate: selectedValue }));
    }
    else {
      alert('날짜를 확인해주세요.');
    };
  };

  // 제휴사 선택
  const handleCompany = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('제휴사 선택');
  };

  // 조회하기
  const handleSearch = () => {

    console.log('조회하기');
  };
  
  return (
    <div className="App">
      {
        isCompany ? <div><p>제휴사 {'>'} 올바로</p><button onClick={handleCompany}>제휴사 선택{'→'}</button></div> : null
      }
      <br/>
      <table >
        <tbody >
          {
            defaultInfo.tableTitles.map((tableTitle) => (
              <tr key={tableTitle.name}>
                <td>{tableTitle.name}</td>
                {
                  // 검색메뉴 목록
                  defaultInfo.tableDatas[tableTitle.menuType].menu.map((item: string, index: number) => <td style={defaultInfo.tableDatas[tableTitle.menuType].isSelected[index] ? active : undefined} onClick={handleSearchCondition} data-index={index} data-menutype={tableTitle.menuType} key={item}>{item}</td>)
                }
                {
                  // 조회기간 달력추가
                  tableTitle.menuType === 'date' && (
                    <td>
                      <input data-name="stDate" onChange={handleCalendar} type='date' value={searchInfo.stDate} /> ~ <input data-name="endDate" onChange={handleCalendar} type='date' value={searchInfo.endDate} />
                    </td>
                  )
                }
              </tr>
            ))
          }
        </tbody>

      </table>
      <br/>
      <button onClick={handleSearch}>조회하기</button>
    </div>
  );
}

export default App2;
