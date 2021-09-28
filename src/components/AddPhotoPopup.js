import { useState } from "react";

export default function AddPhotoPopup({ addPhotoVisibility, closeWindow }) {
  const placeholder = "";
  const [{ alt, src }, setImage] = useState({
    src: placeholder,
    alt: "Upload an Image",
  });
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  return (
    <>
      {addPhotoVisibility} && (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-black-light">
          {/*content*/}
          <div className="border-0 mx-44 rounded-lg shadow-lg relative h-screen w-screen bg-white outline-none focus:outline-none">
            <div className="border-b border-gray-primary w-full h-8 mt-2 px-5 ">
              <img
                src="/images/cancel.png"
                className="cursor-pointer h-5 mt-0.5"
                onClick={closeWindow}
              />
            </div>
            <div className="mt-10 p-10">
              <img src={src} alt={alt} className="w-96 h-96" />

              <div className="m-10">
                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Caption"
                  className="w-96 p-2 border-2 border-gray-primary rounded-lg"
                />
              </div>
              <div className="m-10">
                <button className="bg-blue-light font-bold text-sm rounded text-white w-20 h-8">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      )}
    </>
  );
}
