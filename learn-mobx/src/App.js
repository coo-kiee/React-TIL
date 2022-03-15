import { Observer, useObserver } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import indexStore from './store/indexStore';

const App = () => {

  const { numberStore, infoStore } = indexStore();

  const onClickIncrease = () => {
    numberStore.increaseAction(1);
  }

  const onClickDecrease = () => {
    numberStore.decreaseAction(1);
  }

  return (
    // mobx v6
    // 방법 1 - Observer 컴포넌트로 하위 컴포넌트를 감싸서 사용
    <div>
      <Observer>
        {
          () => (
            <div>
              <p>현재 값: {numberStore.num}</p>
              <button onClick={onClickIncrease}>증가</button>
              <button onClick={onClickDecrease}>감소</button>
            </div>
          )}
      </Observer>
        
    {/* 방법 2 - observable를 사용하는 컴포넌트에 export default observer(컴포넌트) 선언 > 현재 예시는 observer(App) */}
          <p>Title : {infoStore.info.title}</p>
          <p>Context : {infoStore.info.context}</p>
          <input onChange={(e) => infoStore.setInfo(e.target.value, infoStore.info.context)} placeholder="Title 변경" />
          <input onChange={(e) => infoStore.setInfo(infoStore.info.title, e.target.value)} placeholder="Context 변경" />
    </div>
  )
  
}

export default observer(App);

  // mobx v5 > deprecated
  // useObserver
  // return useObserver(() => (

  //   <div>
  //     <p>현재 값: {numberStore.num}</p>

  //     <button onClick={onClickIncrease}>증가</button>
  //     <button onClick={onClickDecrease}>감소</button>

  //     <p>Title : {infoStore.info.title}</p>
  //     <p>Context : {infoStore.info.context}</p>
  //     <input onChange={(e) => infoStore.setInfo(e.target.value, infoStore.info.context)} placeholder="Title 변경" />
  //     <input onChange={(e) => infoStore.setInfo(infoStore.info.title, e.target.value)} placeholder="Context 변경" />
  //   </div>

  // ));