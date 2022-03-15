import jsPDF from 'jspdf';
import ReactDOMServer from "react-dom/server";
import ComponentToPrint from './ComponentToPrint';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const DownloadPdf = () => {

    const componentRef = useRef(null);
    
    // 방법 1 - HTML > Canvas > PNG or JPEG -> PDF 변환 > 실제 화면과 동일한 출력
    // https://www.robinwieruch.de/react-component-to-image/
    // 여러 페이지일 경우 - https://chichi-story.tistory.com/10
    const handleDownload1  = async () => {
        
        let pdf = new jsPDF();
        const element = componentRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'jpeg', 5,5);  // 출력하려는 컴포넌트가 display: "none" 이면 error 발생
        pdf.save("practice-download1");
 
    }

    // 방법 2 - 컴포넌트 내부에서 download 구현 > 실제 화면과 글자 크기가 다름
    // https://reactforyou.com/html-to-pdf-converter-for-your-react-application/
    // https://javascript.plainenglish.io/download-html-as-a-pdf-in-react-fc86114c9095
    const handleDownload2 = () => {
        
        let pdf = new jsPDF(); // new jsPDF('landscape', 'px', 'a4', 'false' )
        
        // 2-1 - Id 이용
        // pdf.html(document.getElementById('pdf'),{
        //     callback: () => {
        //         pdf.save("practice-download2");
        //     }
        // });

        // 2-2 - ref 이용
        {
            // const Foo = componentRef.current;
            // pdf.html(ReactDOMServer.renderToStaticMarkup(Foo),{ // https://thewebdev.info/2021/05/30/how-to-generate-a-pdf-file-from-react-components/
            // pdf.html(ReactDOMServer.renderToStaticMarkup(componentRef.current),{ // 위 소스는 실행 되는데 이 소스는 에러 발생 > 미해결!!
        }
        pdf.html(componentRef.current, {

            callback: () => {
                pdf.save("practice-download2");
            },
            margin : [0,5,5,5],

        });

        // 구현 못한 기능
        // https://thewebdev.info/2021/05/30/how-to-generate-a-pdf-file-from-react-components/

        // 링크로 이미지 다운로드 - 방법 1과 비슷
        // https://www.robinwieruch.de/react-component-to-image/
    }

    return ( 
        <div>
            <br />
            <h4>JSPDF & html2canvas Library</h4>
            <ComponentToPrint ref={componentRef} />
            <button onClick={handleDownload1}>Download PDF1</button>
            <h4>JSPDF Library</h4>
            <button onClick={handleDownload2}>Download PDF2</button>
        </div>
     );
}
 
export default DownloadPdf;