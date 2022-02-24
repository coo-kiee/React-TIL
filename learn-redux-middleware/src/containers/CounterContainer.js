import { useDispatch, useSelector } from "react-redux"
import Counter from "../components/Counter";
// import { decrease, decreaseAsync, increase, increaseAsync } from "../modules/counter";
import { increaseAsync, decreaseAsync } from "../modules/counterSaga";

const CounterContainer = () => {
    const number = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const onIncrease = () => {
        dispatch(increaseAsync());
    };

    const onDecrease = () => {
        dispatch(decreaseAsync());
    };

    return (
        <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
    );
}

export default CounterContainer;