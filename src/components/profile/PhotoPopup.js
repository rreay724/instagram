import React from "react";

export default function PhotoPopup({
  photoVisibility,
  handleCancelClick,
  photo,
}) {
  return (
    <>
      {photoVisibility ? (
        <>
          <div className="z-50 justify-center items-center flex fixed inset-0 outline-none focus:outline-none bg-opacity-10 bg-black-light">
            {/*content*/}
            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col h-5/6 w-5/6 bg-white outline-none focus:outline-none">
              <div className="flex border-b border-gray-primary w-full h-8 mt-2 px-5 pb-2">
                <img
                  src="/images/cancel.png"
                  className="cursor-pointer h-5 mt-0.5"
                  onClick={handleCancelClick}
                  alt=""
                />
              </div>
              <div>
                <img src={photo} className="h-full w-3/6 object-contain" />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
