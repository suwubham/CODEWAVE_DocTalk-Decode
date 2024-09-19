// src/components/FileUpload.tsx
import React, { useState, Dispatch, SetStateAction } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FileUploadProps {
  loading: boolean;
  setIsloading: Dispatch<SetStateAction<boolean>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ loading, setIsloading }) => {
  const [file, setFile] = useState<File | null>(null);

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    setIsloading(true);
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          const response = await axios.post("http://127.0.0.1:8000/process", {
            body: url,
            first: "1",
          });
          console.log(response.data);
          navigate("/chat", { state: { message: response.data } });
          setDownloadURL(url);
        });
      }
    );
    setTimeout(() => {
      setIsloading(false);
    }, 2500);
    console.log(loading);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <Button variant="secondary" onClick={handleUpload} disabled={!file}>
        Upload
      </Button>

      {/* {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>} */}
      {/* {downloadURL && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )} */}
    </div>
  );
};

export default FileUpload;
