import { useRef } from 'react';


const DefaultPrint = () => {

    const printRef = useRef(null);

    const onClickPrint = () => {

        let printContent = printRef.current;
        let windowObj = window.open(
            '',
            'defaultPrint',
            'width=1350, height=800'
        );
        windowObj.document.writeln(printContent.innerHTML);
        windowObj.document.close();
        windowObj.focus();
        windowObj.print();
        windowObj.close();

    }

    return (
        <div>
            <ul ref={printRef}>
                {[1,2,3,4].map( el => (
                    <li key={el}>{el}!</li>
                    ))}
            </ul>
            <button onClick={onClickPrint}> 라이브러리 사용 없이 프린트</button>
            <br/>
        </div>
    )

}

export default DefaultPrint;