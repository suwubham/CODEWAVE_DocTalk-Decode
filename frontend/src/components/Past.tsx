// src/pages/FilesGrid.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase"; // Ensure firestore and storage are initialized
import { format } from "date-fns"; // Optional: to format the date
import { Button } from "@/components/ui/button";

const FilesGrid: React.FC = () => {
  const [files, setFiles] = useState<
    Array<{ id: string; downloadURL: string; createdAt: any }>
  >([]);

  useEffect(() => {
    // Fetch files from Firestore
    const fetchFiles = async () => {
      const querySnapshot = await getDocs(collection(db, "uploads"));
      const filesData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Store document ID for later deletion
        downloadURL: doc.data().downloadURL,
        createdAt: doc.data().createdAt?.toDate(), // Convert timestamp to Date object
      }));
      setFiles(filesData);
    };

    fetchFiles();
  }, []);

  // Handle file deletion from Firestore and Storage
  const handleDelete = async (id: string, downloadURL: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return;

    try {
      // 1. Delete the file from Firebase Storage
      const storageRef = ref(storage, downloadURL); // Reference to the file in storage
      await deleteObject(storageRef);

      // 2. Delete the document from Firestore
      await deleteDoc(doc(db, "uploads", id));

      // Update UI by filtering out the deleted file
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));

      console.log(`File with id ${id} successfully deleted`);
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Uploaded Files</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4">
              {/* Preview image */}
              <img
                src={file.downloadURL}
                alt={`Uploaded file ${index}`}
                className="w-full h-48 object-cover mb-4"
              />
              {/* Display upload date */}
              <p className="text-sm text-gray-600">
                Uploaded on:{" "}
                {file.createdAt
                  ? format(file.createdAt, "PPPpp")
                  : "Unknown date"}
              </p>

              {/* Download button */}
              <a href={file.downloadURL} download className="mt-4 inline-block">
                <Button className="bg-black text-white rounded hover:bg-slate-700">
                  Download
                </Button>
              </a>

              {/* Delete button */}
              <Button
                variant="destructive"
                className="mt-2"
                onClick={() => handleDelete(file.id, file.downloadURL)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesGrid;
