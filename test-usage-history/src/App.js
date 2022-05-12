import { useEffect, useState } from 'react';
import { AppService } from './AppService';

function App() {

  // 0: 개인회원 / 1: 제휴사
  const [userType, setUserType] = useState(0);
  // 제휴사 여부 확인
  useEffect(() => {
    setUserType(prev => 1);
  },[]);

  // 검색 메뉴
  const defaultPageInfo = {
    tableTitles: [{ menuType: 0, name: '조회기간', isUserType: false }, { menuType: 1, name: '조회구분', isUserType: false }, { menuType: 2, name: '지급방식', isUserType: true }],
    tableDatas: [
      ['오늘', '어제', '최근7일', '당월', '전월'],
      ['전체', '완료', '취소', '진행중', '예약'],
      [['전체', '선불', '착불', '카드', '송금'], ['전체', '계약', '선불', '착불', '카드', '송금']],
    ],
    selectTypes: ['전체', '완료', '취소', '진행중', '예약'],
    payTypes: [['전체', '선불', '착불', '카드', '송금'], ['전체', '계약', '선불', '착불', '카드', '송금']],
  };

  // 검색 조건
  const [pageInfo, setPageInfo] = useState({
    stDate: AppService.getDate('0'),
    endDate: AppService.getDate('0'),
    selectType: 0,
    payTypes: 0,
    searchText: '',
  });
  
  // 검색조건 선택
  const handleSearchCondition = (e) => {

    const menuType = e.currentTarget.getAttribute('data-menutype');
    const idx = e.currentTarget.getAttribute('data-id');
    
    // 0:조회기간 / 1:조회구분 / 2:지급방식
    switch (menuType) {
      case '0':
        setPageInfo(prev => ({ ...prev, stDate: AppService.getDate(idx) }));
        break;
      case '1':
        setPageInfo(prev => ({...prev, selectType: defaultPageInfo.selectTypes[idx]}))
        break;
      case '2':
        setPageInfo(prev => ({...prev, selectType: defaultPageInfo.payTypes[userType][idx]}))
        break;
      default:
        break;
    };
  };

  // 달력날짜 변경
  const handleCalendar = (e) => {

    const type = e.currentTarget.getAttribute('data-name');
    const selectedValue = e.target.value;
    console.log(selectedValue);
    console.log(new Date(selectedValue));
    console.log(AppService.getDate('5'));
    console.log(new Date(AppService.getDate('5')));
    console.log(new Date(AppService.getDate('5') - new Date(selectedValue)) );
    console.log(new Date(selectedValue) - new Date(AppService.getDate('5')) );
    if (type === 'stDate') {
      setPageInfo(prev => ({ ...prev, stDate: selectedValue }));
    }
    else {
      setPageInfo(prev => ({ ...prev, endDate: selectedValue }));
    };

    // 날짜 유효성 검사(6개월)
    
  };

  // 제휴사 선택버튼 클릭
  const handleCompany = (e) => {
    console.log('제휴사 선택');
  };

  return (
    <div className="App">
      {
        userType? <div><p>제휴사 {'>'} 올바로</p><button onClick={handleCompany}>제휴사 선택{'→'}</button></div> : null
      }
      <table >
        <tbody >
          {
            defaultPageInfo.tableTitles.map((tableTitle, idx) => (
              <tr key={tableTitle.name}>
                <td>{tableTitle.name}</td>
                {
                  // isUserType? defaultPageInfo.tableDatas[idx][userType] : defaultPageInfo.tableDatas[idx]
                  tableTitle.isUserType? defaultPageInfo.tableDatas[idx][userType].map((data, id) => <td onClick={handleSearchCondition} data-id={id} data-menutype={tableTitle.menuType} key={data}>{data}</td>)
                  : defaultPageInfo.tableDatas[idx].map((data, id) => <td onClick={handleSearchCondition} data-id={id} data-menutype={tableTitle.menuType} key={data}>{data}</td>)
                }
                {
                  // 조회기간 달력추가
                  idx === 0 ? <td><input data-name="stDate" onChange={handleCalendar} type='date' value={pageInfo.stDate} /> ~ <input data-name="endDate" onChange={handleCalendar} type='date' value={pageInfo.endDate} /></td> : null
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
