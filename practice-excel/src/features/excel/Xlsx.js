import * as xlsx from 'xlsx';

const Xlsx = () => {
    // https://wickedmagica.tistory.com/248
    
    // 엑셀 데이터 읽어오기
    // https://codesandbox.io/s/xlsx-react-demo-34ft7?file=/src/App.js:1505-1515
    // https://stackoverflow.com/questions/57871476/read-a-file-with-xlsx-readfile
    const SheetJSFT = [
        "xlsx",
        "xlsb",
        "xlsm",
        "xls",
        "xml",
        "csv",
        "txt",
        "ods",
        "fods",
        "uos",
        "sylk",
        "dif",
        "dbf",
        "prn",
        "qpw",
        "123",
        "wb*",
        "wq*",
        "html",
        "htm"
      ];

    SheetJSFT.map(x => {
        return "." + x;
    }).join(",");

    // 선택한 파일 데이터 엑셀 데이터 형식으로 변경
    const loadExcel = (e) => {

        const file = e.target.files[0];
        const fileReader = new FileReader();
        if(file)
        {
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e?.target.result;
                const excelFile = xlsx.read(bufferArray, { type: "buffer" });
                const jsonDatas = excelFile.SheetNames.map(sheetName => {
                    const Sheet = excelFile.Sheets[sheetName];
                    const jsonData = xlsx.utils.sheet_to_json( Sheet, { defval : "" });
                    // const jsonData = xlsx.utils.sheet_to_json(Sheet, { header: ["A", "B", "C", "D"] });
                    return jsonData;
                });

                // const sheetName = excelFile.SheetNames[0];      // 첫번째 시트 이름
                // const firstSheet = excelFile.Sheets[sheetName]  // 첫번째 시트 정보 추출
                // const sheetName2 = excelFile.SheetNames[1];      // 두번째 시트 이름
                // const secondSheet = excelFile.Sheets[sheetName2]  // 두번째 시트 정보 추출
                // const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } );
                // const jsonData = xlsx.utils.sheet_to_json( firstSheet, { header:["A","B","C","D"] } );
                console.log(jsonDatas);
            }
        }
    }

    // 배열 배열 데이터
    const file1 = [
        ["이름", "나이"],
        ["장민우", "31"],
        ["장민우2", "32"],
    ];

    // 배열 객체 데이터
    const file2 = [
        { A: "학과", B: "직급", C: "이름", D: "나이" },
        { A: "흉부외과", B: "의사", C: "장민우", D: "31" },
        { A: "성형외과", B: "의사", C: "장민우2", D: "32" },
    ]

    const book = xlsx.utils.book_new();

    // 배열 배열 데이터 저장
    const saveExcel1 = (file1) => {
        const excel1 = xlsx.utils.aoa_to_sheet(file1);

        // excel1['!cols']는 엑셀 파일의 행 사이즈를 조절
        excel1["!cols"] = [
            {wpx: 130}, // A열
            {wpx: 100}, // B열
            {wpx: 80},  // C열
            {wch: 80},  // D열
        ];

        // workbook에 워크시트 추가(workbook 객체, 행 사이즈, Sheet명)
        xlsx.utils.book_append_sheet(book, excel1, "excel1");
    }
    
    // 배열 객체 데이터 저장
    const saveExcel2 = (file2) => {
        const excel2 = xlsx.utils.json_to_sheet(file2);
        excel2["!cols"] = [
            {wpx: 130}, // A열
            {wpx: 100}, // B열
            {wpx: 80},  // C열
            {wch: 80},  // D열
        ];
        // workbook에 워크시트 추가(workbook 객체, 행 사이즈, Sheet명)
        xlsx.utils.book_append_sheet(book, excel2, "excel2");
    }
    
    const handleSaveExcel = () => {

        // saveExcel1(file1);
        // saveExcel2(file2);
        // // 엑셀 파일 다운로드
        // xlsx.writeFile(book, "saveXlsx.xlsx");

        // Utils 테스트
        const option = [
            { wpx: 130 }, // A열
            { wpx: 100 }, // B열
            { wpx: 80 },  // C열
            { wch: 80 },  // D열
        ];
        excelDownload([file1, file2], ['array', 'object'], [option, option], "saveXlsx.xlsx");

    }

    // Utils
    const excelDownload = (downloadDatas, types, options, title) => {
        const book = xlsx.utils.book_new();

        // 엑셀 워크시트 추가함수
        const addSheet = (index) => {
            let exelData; // any
            const type = index > -1 ? types[index].toLowerCase() : types;
            const downloadData = index > -1 ? downloadDatas[index] : downloadDatas;
            console.log(downloadData);
            switch (type) {
                case 'table':
                    exelData = xlsx.utils.table_to_sheet(downloadData);
                    break;
                case 'array': // const file1 = [ ["이름", "나이"], ["장민우", "31"], ]
                    exelData = xlsx.utils.aoa_to_sheet(downloadData);
                    break;
                case 'object': // const file2 = [ { A: "학과", B: "직급", C: "이름", D: "나이" }, { A: "흉부외과", B: "의사", C: "장민우", D: "31" }, ]
                    exelData = xlsx.utils.json_to_sheet(downloadData);
                    break;
                default:
                    return;
            };
            exelData["!cols"] = index > -1 ? options[index] : options;
            const sheetName = index > -1 ? title + index : title;
            xlsx.utils.book_append_sheet(book, exelData, sheetName);
        };

        if (downloadDatas.length > 1) {
            downloadDatas.forEach((downloadData, index) => {
                addSheet(index);
            });
        }
        else {
            addSheet();
        };
        // title: '이용내역.xlsx'
        xlsx.writeFile(book, title);
    };

    return ( 
        <div>
            <h1>Xlsx</h1>
            <button onClick={handleSaveExcel}>Xlsx 생성</button>
            <br/><br/>
            <input type={"file"} onChange={loadExcel} accept={SheetJSFT}/>
        </div>
     );
}
 
export default Xlsx;