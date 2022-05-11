import { useState } from 'react';
import { AppService } from './AppService';

function App() {

  const defaultPageInfo = {
    tableTitles: [{ menuType: 0, name: '조회기간' }, { menuType: 1, name: '조회구분' }, { menuType: 2, name: '지급방식' }],
    tableDatas: [
      ['오늘', '어제', '최근7일', '당월', '전월'],
      ['전체', '완료', '취소', '진행중', '예약'],
      ['전체', '계약', '선불', '착불', '카드', '송금']
    ],
    selectTypes: ['전체', '완료', '취소', '진행중', '예약'],
    payTypes: ['전체', '계약', '선불', '착불', '카드', '송금'],
  };
  const [date, setDate] = useState(AppService.getDate('0'));

  const selectCondition = (e) => {

    const menuType = e.currentTarget.getAttribute('data-menutype');
    const idx = e.currentTarget.getAttribute('data-id');
    
    // 0:조회기간 / 1:조회구분 / 2:지급방식
    switch (menuType) {
      case '0':
        setDate(prev => AppService.getDate(idx));
        break;
      default:
        break;
    };
  };

  const selectData = (e) => {
    setDate(prev => e.target.value);
  };

  return (
    <div className="App">
      <table >
        <tbody >
          {
            defaultPageInfo.tableTitles.map((tableTitle, idx) => (
              <tr key={tableTitle.name}>
                <td>{tableTitle.name}</td>
                {
                  defaultPageInfo.tableDatas[idx].map((data, id) => <td onClick={selectCondition} data-id={id} data-menutype={tableTitle.menuType} key={data}>{data}</td>)
                }
                {
                  idx === 0 ? <td><input onChange={selectData} type='date' value={date} /></td> : null
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
