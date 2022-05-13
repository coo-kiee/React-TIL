import { useEffect, useState } from 'react';
import { AppService } from './AppService';

function App() {

  // 제휴사 여부 확인 - useQuery로 대체 예정
  const [isCompany, setIsCompany] = useState(true);
  
  // 검색메뉴 - 지급방식
  const [pay, setPay] = useState({ 
    menu: ['전체', '선불', '착불', '카드', '송금'],
    val: ['전체', '선불', '착불', '카드', '송금'],
  });

  // 제휴사 여부 확인
  useEffect(() => {

    if(isCompany) {
      setIsCompany(prev => true);
      setPay(prev => ({
        menu: ['전체', '계약', '선불', '착불', '카드', '송금'],
        val: ['전체', '계약', '선불', '착불', '카드', '송금'],
      }));
    };
  },[isCompany]);

  // 검색메뉴
  const defaultPageInfo = {
    tableTitles: [{ menuType: 'date', name: '조회기간' }, { menuType: 'state', name: '조회구분' }, { menuType: 'pay', name: '지급방식' }],
    tableDatas: {
      date: { 
        menu: ['오늘', '어제', '최근7일', '당월', '전월'],
      },
      state: { 
        menu: ['전체', '완료', '취소', '진행중', '예약'], 
        val: ['전체', '완료', '취소', '진행중', '예약'],
      },
      pay: pay
    },
  };

  // 검색조건
  const [pageInfo, setPageInfo] = useState({
    stDate: AppService.getDate('0'),
    endDate: AppService.getDate('0'),
    state: 0,
    payVal: 0,
    searchText: '',
  });
  
  // 검색조건 선택
  const handleSearchCondition = (e) => {

    const idx = e.currentTarget.getAttribute('data-idx');
    const menuType = e.currentTarget.getAttribute('data-menutype');
    
    switch (menuType) {
      case 'date':
        setPageInfo(prev => ({ ...prev, stDate: AppService.getDate(idx) }));
        break;
      case 'state':
        setPageInfo(prev => ({...prev, state: defaultPageInfo.tableDatas[menuType].val[idx]}))
        break;
      case 'pay':
        setPageInfo(prev => ({...prev, state: defaultPageInfo.tableDatas[menuType].val[idx]}))
        break;
      default:
        break;
    };
  };

  // 달력날짜 변경
  const handleCalendar = (e) => {

    const type = e.currentTarget.getAttribute('data-name');
    const selectedValue = e.target.value;

    // type 구분 && 날짜 유효성 검사
    if (type === 'stDate' && AppService.validateDate(selectedValue, pageInfo.endDate)) {
      setPageInfo(prev => ({ ...prev, stDate: selectedValue }));
    }
    else if (type === 'endDate' && AppService.validateDate(pageInfo.stDate, selectedValue)) {
      setPageInfo(prev => ({ ...prev, endDate: selectedValue }));
    }
    else {
      alert('날짜를 확인해주세요.');
    };
  };

  // 제휴사 선택버튼 클릭
  const handleCompany = (e) => {
    console.log('제휴사 선택');
  };

  return (
    <div className="App">
      {
        isCompany? <div><p>제휴사 {'>'} 올바로</p><button onClick={handleCompany}>제휴사 선택{'→'}</button></div> : null
      }
      <table >
        <tbody >
          {
            defaultPageInfo.tableTitles.map((tableTitle) => (
              <tr key={tableTitle.name}>
                <td>{tableTitle.name}</td>
                {
                  // 검색메뉴 목록
                  defaultPageInfo.tableDatas[tableTitle.menuType].menu.map((data, idx) => <td onClick={handleSearchCondition} data-idx={idx} data-menutype={tableTitle.menuType} key={data}>{data}</td>)
                }
                {
                  // 조회기간 달력추가
                  tableTitle.menuType === 'date' && (
                    <td>
                      <input data-name="stDate" onChange={handleCalendar} type='date' value={pageInfo.stDate} /> ~ <input data-name="endDate" onChange={handleCalendar} type='date' value={pageInfo.endDate} />
                    </td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
