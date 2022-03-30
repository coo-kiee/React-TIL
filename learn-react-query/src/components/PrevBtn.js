import { useNavigate } from "react-router-dom";

const PrevBtn = () => {

    const navigator = useNavigate();

    const handlePrevPage = () => {
        navigator(-1);
    };

    return ( 
        <div style={{margin: "5px"}}>
            <button onClick={handlePrevPage}>Go Home</button>
        </div>
     );
}
 
export default PrevBtn;