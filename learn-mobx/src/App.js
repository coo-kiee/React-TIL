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
    // Observer 컴포넌트로 하위 컴포넌트를 감싸거나, 하위 컴포넌트에서 export default observer(하위 컴포넌트) 선언
    <Observer> 
      {
        () => (

      <div>
        <p>현재 값: {numberStore.num}</p>

        <button onClick={onClickIncrease}>증가</button>
        <button onClick={onClickDecrease}>감소</button>

        <p>Title : {infoStore.info.title}</p>
        <p>Context : {infoStore.info.context}</p>
        <input onChange={(e) => infoStore.setInfo(e.target.value, infoStore.info.context)} placeholder="Title 변경" />
        <input onChange={(e) => infoStore.setInfo(infoStore.info.title, e.target.value)} placeholder="Context 변경" />
      </div>
        
      )}
      </Observer>
  )
  
  // useObserver - deprecated
  return useObserver(() => (

    <div>
      <p>현재 값: {numberStore.num}</p>

      <button onClick={onClickIncrease}>증가</button>
      <button onClick={onClickDecrease}>감소</button>

      <p>Title : {infoStore.info.title}</p>
      <p>Context : {infoStore.info.context}</p>
      <input onChange={(e) => infoStore.setInfo(e.target.value, infoStore.info.context)} placeholder="Title 변경" />
      <input onChange={(e) => infoStore.setInfo(infoStore.info.title, e.target.value)} placeholder="Context 변경" />
    </div>

  ));
}

export default App;
