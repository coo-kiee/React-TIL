import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { AppService } from './AppService';
import { defaultInfo2, searchInfo } from './type';


const active = {
  background: 'yellow'
};

function App() {

  // 제휴사 여부 - queryClient.getData로 대체 예정
  // const loginUser = queryClient.getData('user');
  const isCompany = true;
  
  // 제휴사 여부 확인
  useEffect(() => {
    
    // if (loginUser.isCompany)
    if (!isCompany) {

      let updateArray = defaultInfo2;
      updateArray[2] = {
        ...defaultInfo2[2],
        menu: ['전체', '계약', '선불', '착불', '카드', '송금'],
        val: ['전체', '계약', '선불', '착불', '카드', '송금'],
        isSelected: [false, false, false, false, false, false],
      }
      setDefaultInfo2(prev => updateArray);
    };

  }, [isCompany]);

  // 검색메뉴2
  const [defaultInfo2, setDefaultInfo2] = useState<Array<defaultInfo2>>([
    {
      id: 0,
      menuType: 'date',
      name: '조회기간',
      menu: ['오늘', '어제', '최근7일', '당월', '전월'],
      val: ['0', '1', '2', '3', '4'],
      isSelected: [true, false, false, false, false],
    },
    {
      id: 1,
      menuType: 'state',
      name: '조회구분',
      menu: ['전체', '완료', '취소', '진행중', '예약'],
      val: ['전체', '완료', '취소', '진행중', '예약'],
      isSelected: [false, false, false, false, false],
    },
    {
      id: 2,
      menuType: 'pay',
      name: '지급방식',
      menu: ['전체', '선불', '착불', '카드', '송금'],
      val: ['전체', '선불', '착불', '카드', '송금'],
      isSelected: [false, false, false, false, false],
    },
  ]);

  // 검색조건
  const [searchInfo, setSearchInfo] = useState<searchInfo>({
    stDate: AppService.getDate(0).dtStart,
    endDate: AppService.getDate(0).dtEnd,
    state: [],
    pay: [],
    searchText: '',
  });

  // 검색조건 선택
  const handleSearchCondition2 = (e: MouseEvent) => {

    const index = parseInt(e.currentTarget.getAttribute('data-index') as string);
    const id = parseInt(e.currentTarget.getAttribute('data-id') as string);
    let isSelected = defaultInfo2[id].isSelected;
    
    if (id === 0 || index === 0) {
      isSelected.fill(false);
    } else {
      isSelected[0] = false;
    };
    
    isSelected[index] = !isSelected[index];
    let updateData = [...defaultInfo2];
    updateData[id] = { ...updateData[id], isSelected }
    
    setDefaultInfo2(prev => ({ ...updateData }));

    if(id === 0) {
      setSearchInfo(prev => ({ ...prev, ...AppService.getDate(index) }));
    };

  };

  // console.log('defaultInfo', defaultInfo);
  // console.log('defaultInfo2', defaultInfo2);
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

  // 검색
  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInfo(prev => ({
        ...prev,
        searchText: e.currentTarget.value,
    }));
};

  // 제휴사 선택
  const handleCompany = (e: MouseEvent<HTMLButtonElement>) => {

    console.log('제휴사 선택');
    let updateDate = defaultInfo2;
    updateDate[1].isSelected.fill(false);
    updateDate[1].isSelected[0] = true;

    updateDate[2].isSelected.fill(false);
    updateDate[2].isSelected[1] = true;
    updateDate[2].isSelected[2] = true;

    setDefaultInfo2(prev => [...updateDate]);

    handleSearch();
  };

  // 조회하기
  const handleSearch = () => {

    console.log('조회하기');
    let updateData = searchInfo;

    defaultInfo2.forEach((item) => {

      let arr:string[] = [];

      item.isSelected.forEach((selected, index) => {
        selected && arr.push(item.val[index]);
      });

      const menuType = item.menuType;
      updateData[menuType] = arr;
    });

    setSearchInfo(prev => ({ ...updateData }));
  };
  
  return (
    <div className="App">
      {
        isCompany ? <div><p>제휴사 {'>'} 올바로</p><button onClick={handleCompany}>제휴사 선택{'→'}</button></div> : null
      }
      <p>검색 <input onChange={handleInputText} value={searchInfo.searchText} /></p>
      <table >
        <tbody >
        <tr></tr>
          {
            defaultInfo2.map((defaultInfo2Data) => (
              <tr key={defaultInfo2Data.name}>
                <td>{defaultInfo2Data.name}</td>
                {
                  // 검색메뉴 목록
                  defaultInfo2Data.menu.map((item: string, index: number) => <td style={defaultInfo2Data.isSelected[index] ? active : undefined} onClick={handleSearchCondition2} data-index={index} data-id={defaultInfo2Data.id} key={item}>{item}</td>)
                }
                {
                  // 조회기간 달력추가
                  defaultInfo2Data.menuType === 'date' && (
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

export default App;
