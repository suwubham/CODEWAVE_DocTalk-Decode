import { storage } from "../../firebase";
import { getStorage, ref } from "firebase/storage";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const Upload = () => {
  const [isLoading, setIsloading] = useState(false);
  return (
    <div className="flex justify-between w-full">
      <section className="bg-gray-900 text-white w-full">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Medical Clarity, Simplified for You
              {/* <span className="sm:block"> Increase Conversion. </span> */}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-xl/relaxed">
              Transforming complex reports into clear insights for everyday
              understanding.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="block w-full rounded border border-blue-600 bg-blue-600 px-4 py-2 sm:px-8">
                <FileUpload loading={isLoading} setIsloading={setIsloading} />
              </div>

              <a
                className="block w-full rounded border border-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
            {isLoading && <p className="mt-5">Uploading...</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Upload;
