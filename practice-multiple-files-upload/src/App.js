import UploadFiles from "./features/noDropZone/FilesUpload";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div className="my-2">
        <h3>React upload multiple Files</h3>
      </div>
      <UploadFiles />
    </div>
  );
}

export default App;
