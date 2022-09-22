import { useRef } from 'react';


const NoLibraryPrint = () => {

    const printRef = useRef(null);

    // 방법 1 - 새창을 띄워서 print
    // https://wiki.jjagu.com/?p=457
    const onClickPrint = () => {

        let printContent = printRef.current;
        let windowObj = window.open(
            '',
            'NoLibraryPrint',
            'width=1350, height=800'
        );
        windowObj.document.body.append(printContent);
        windowObj.document.writeln(printContent.innerHTML);
        windowObj.document.title = "No-Library-Print";
        windowObj.document.close();
        windowObj.focus();
        windowObj.print();
        windowObj.close();
    }

    // 방법 2 - 기존 body display none > 새로운 node 추가 > 출력 > 추가한 node 제거 > body display block
    // https://maks.tistory.com/entry/Javascript%EB%A1%9C-%ED%8A%B9%EC%A0%95-%EC%98%81%EC%97%AD-%EC%9D%B8%EC%87%84%ED%95%98%EA%B8%B0-IE11-%ED%8F%AC%ED%95%A8
    // https://milooy.wordpress.com/2017/03/28/javascript-print-page/
    const onClickPrint2 = () => {
        const printContent = printRef.current;
        printElement(printContent);
    }
    
    const printElement = (element) => {
        
        const domClone = element.cloneNode(true);
        const div = document.querySelector("div");
        
        let printSection = document.getElementById("printSection");
        
        // https://codepen.io/designify-me/pen/gMMepB
        if(!printSection) {
            // document.title = "No-Library-Print";
            printSection = document.createElement("div");
            printSection.id = "printSection";
            printSection.style.display = "none";
            document.body.appendChild(printSection);
        }

        printSection.appendChild(domClone);
        handleDisplay(div, printSection);
        window.print();
        printSection.innerHTML = "";
        handleDisplay(div, printSection);
    }

    // Object Literals - https://velog.io/@chloeee/%EB%B2%88%EC%97%AD-If-elseswitch%EB%A5%BC-%EC%93%B0%EC%A7%80%EB%A7%90%EA%B3%A0-Object-Literals%EB%A5%BC-%EC%8D%A8%EB%9D%BC
    const handleDisplay = (origin, print) => {

        const display = {
            '': "none",
            block : "none",
            none : "block"
        };
        origin.style.display = display[origin.style.display];
        print.style.display = display[print.style.display];
    }

    return (
        <div ref={printRef}>
            <h4 id='title'>No Library Print</h4>
            <ul>
                {[1,2,3,4].map( el => (
                    <li key={el}>{el}!</li>
                    ))}
            </ul>
            <button onClick={onClickPrint}> 라이브러리 사용 없이 프린트1</button>
            <button onClick={onClickPrint2}> 라이브러리 사용 없이 프린트2</button>
            <br/>
        </div>
    )

}

export default NoLibraryPrint;