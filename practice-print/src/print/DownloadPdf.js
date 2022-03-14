import jsPDF from 'jspdf';
import ReactDOMServer from "react-dom/server";
import ComponentToPrint from './ComponentToPrint';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const DownloadPdf = () => {

    const componentRef = useRef(null);
    
    // 방법 1 - HTML > Canvas > PNG or JPEG -> PDF 변환
    // https://www.robinwieruch.de/react-component-to-image/
    const handleDownloadImage  = async () => {

        var pdf = new jsPDF('p','mm');
        const element = componentRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        // const link = document.createElement('a');

        // if (typeof link.download === 'string') {
        //     link.href = imgData;
        //     link.download = 'image.jpg';

        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        // } else {
        //     window.open(imgData);
        // }
        pdf.addImage(imgData, 'png', 0,0);
        console.log('pdf2');
        pdf.save("practice-download2");
 
    }

    // 방법 2 - 단점 : Component가 깨진다 > 이를 위해 방법 2 사용
    // https://thewebdev.info/2021/05/30/how-to-generate-a-pdf-file-from-react-components/
    const handleDownload = () => {

        var pdf = new jsPDF(); // new jsPDF('landscape', 'px', 'a4', 'false' )
        pdf.html(ReactDOMServer.renderToStaticMarkup(<ComponentToPrint />),{
            callback: () => {
                pdf.save("practice-download1");
            }
        });
    }

    return ( 
        <div>
            <br />
            <div style={{display:"none"}} ref={componentRef}>Download PDF!!!</div>
            <button onClick={handleDownloadImage}>Download PDF1</button>
            <button onClick={handleDownload}>Download PDF2</button>
        </div>
     );
}
 
export default DownloadPdf;