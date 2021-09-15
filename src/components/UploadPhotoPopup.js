import React from "react";

export default function UploadPhotoPopup({
  profileVisibility,
  handleUploadClick,
  handleCancelClick,
  onFileChange,
}) {
  return (
    <>
      {profileVisibility ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-black-light">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-1 border-b border-solid border-blueGray-200 rounded-t">
                <label className="my-4 text-blueGray-500 text-sm font-bold leading-relaxed mx-auto  cursor-pointer text-blue-light">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                  <a onClick={handleUploadClick}>Upload Photo</a>
                </label>
              </div>
              {/*body*/}
              <div className="relative p-1 flex">
                <p className="my-4 text-blueGray-500 text-sm font-bold leading-relaxed mx-auto  cursor-pointer text-red-primary">
                  Remove Current Photo
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
                <p
                  className="my-4 text-blueGray-500 text-sm leading-relaxed mx-auto  cursor-pointer text-black-light"
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </p>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
