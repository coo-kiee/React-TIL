import { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

const UseReactToPrint = () => {

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return ( 
        <div>
            <br />
            {/* 방법 1 - useReactToPrint Hook 사용 */}
            <ComponentToPrint ref={componentRef} />
            <button onClick={handlePrint}>프린트하기1</button>
            {/* 방법 2 - ReactToPrint 컴포넌트 사용 */}
            <ReactToPrint
                trigger={() => <button>프린트하기2</button>}
                content={() => componentRef.current}
            />
        </div>
     );
}
 
export default UseReactToPrint;