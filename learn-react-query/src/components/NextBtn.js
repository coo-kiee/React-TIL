import { useNavigate } from "react-router-dom";

const NextBtn = () => {

    const navigator = useNavigate();

    const handleNextPage = () => {
        navigator(+1);
    };

    return ( 
        <div>
            <button onClick={handleNextPage}>Next Page</button>
        </div>
     );
}
 
export default NextBtn;