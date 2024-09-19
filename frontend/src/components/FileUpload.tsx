// src/components/FileUpload.tsx
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase"; // Ensure you have db initialized in firebase.js
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Import db methods

const FileUpload: React.FC = () => {
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
          // Save the download URL and timestamp to db
          try {
            const docRef = await addDoc(collection(db, "uploads"), {
              downloadURL: url,
              createdAt: Timestamp.now(),
            });

            console.log("Document written with ID: ", docRef.id);

            // Sending the URL to your backend
            const response = await axios.post("http://127.0.0.1:8000/process", {
              body: url,
              first: "1",
            });

            navigate("/chat", { state: response.data });
            setDownloadURL(url);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <Button variant="secondary" onClick={handleUpload} disabled={!file}>
        Upload
      </Button>

      {/* {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>} */}
      {downloadURL && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
