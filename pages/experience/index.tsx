import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "PNG", "GIF"];

export default function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);


  const uploadToClient = (file) => {
    setImage(file);
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
  };



  return (
    <div >
      <h1>Hello To Drag & Drop Files</h1>
      <FileUploader
        // multiple={true}
        handleChange={uploadToClient}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>

      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
        </button>
    </div>
  );
}
