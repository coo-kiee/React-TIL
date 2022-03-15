import { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

const UseReactToPrint = () => {

    {/* 방법 1 - useReactToPrint Hook 사용 */}
    // https://www.npmjs.com/package/react-to-print
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle : "React-To-Print",
        pageStyle : "@page { margin: 5px } @media print {html, body {height: 99%}}",
    });

    return ( 
        <div>
            {/* <br /> */}
            <h4>React-to-Print Library</h4>
            {/* React-to-Print API는 DownloadPdf.js 방법 1과 다르게 display:"none" 사용 가능 */}

            {/* 방법 1 */}
            <ComponentToPrint ref={componentRef} />
            <button onClick={handlePrint}>프린트하기1</button>

            {/* 방법 2 - ReactToPrint 컴포넌트 사용 */}
            <ReactToPrint
                trigger={() => <button>프린트하기2</button>}
                content={() => componentRef.current}
                documentTitle={"React-To-Print"}
                pageStyle="@page { size: 1754px 1240px; margin: 0px } @media print {html, body {height: 99%}}"
            />
        </div>
     );
}
 
export default UseReactToPrint;