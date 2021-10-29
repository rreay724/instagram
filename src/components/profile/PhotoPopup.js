import React from "react";

export default function PhotoPopup({
  photoVisibility,
  handleCancelClick,
  photo,
}) {
  return (
    <>
      <div className="z-50 justify-center items-center flex fixed inset-0 outline-none focus:outline-none bg-opacity-25 bg-black-light">
        <div className="fixed top-10 right-10">
          <svg
            aria-label="Close"
            class="_8-yf5 "
            color="#ffffff"
            fill="#ffffff"
            height="24"
            role="img"
            viewBox="0 0 48 48"
            width="24"
            className="cursor-pointer"
            onClick={handleCancelClick}
          >
            <path
              clip-rule="evenodd"
              d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>

        {/*content*/}
        <div className=" border-0 rounded-lg shadow-lg w-11/12 bg-white outline-none focus:outline-none m-48">
          <div className="flex ">
            <img src={photo} className="object-cover w-4/6" />
            <p>Comments</p>
          </div>
        </div>
      </div>
    </>
  );
}
