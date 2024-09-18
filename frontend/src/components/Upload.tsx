import { storage } from "../../firebase";
import { getStorage, ref } from "firebase/storage";
import FileUpload from "./FileUpload";

const Upload = () => {
  const upload_pic = () => {
    console.log("Hello World");
    const spaceref = ref(storage, "app.png");
    console.log(spaceref);
  };

  return (
    <>
      <FileUpload />
      {/* <Button onClick={upload_pic}>Upload Diagnosis</Button> */}
    </>
  );
};

export default Upload;
