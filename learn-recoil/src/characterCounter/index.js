import { useRecoilState, useRecoilValue } from 'recoil';
import { textState } from '../recoil/atom';
import { charCountState, nowPlayingAPI } from '../recoil/selector';

const CharacterCounter = () => {

    const {REACT_APP_TMDB_KEY} = process.env;

    const apiData = useRecoilValue(nowPlayingAPI(REACT_APP_TMDB_KEY));

    console.log(apiData);

    return (
        <div>
            <TextInput />
            <CharacterCount />
        </div>
    )
}

export default CharacterCounter;

const TextInput = () => {
    const [text, setText] = useRecoilState(textState);

    const onChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <input type="text" value={text} onChange={onChange} />
            <br />
            Echo: {text}
        </div>
    );
}

const CharacterCount = () => {

    const count = useRecoilValue(charCountState);

    return (
        <>
            <h3>Character Counte: {count}</h3>
        </>
    );
}