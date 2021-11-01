import { useState, useRef } from "react";
import { firebase } from "../lib/firebase";

export default function AddPhotoPopup({
  addPhotoVisibility,
  closeWindow,
  profileUserId,
}) {
  const [file, setFile] = useState("");
  const [visibility, setVisibility] = useState(true);
  const placeholder = "/placeholder.jpg";
  const date = new Date().getTime();
  const inputRef = useRef();
  const [{ alt, src }, setImage] = useState({
    src: placeholder,
    alt: "Upload an Image",
  });
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setImage({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref(`uploadedPics/${file.name}`);
    await storageRef.put(file);
    db.collection("photos")
      .doc()
      .set({
        caption: inputRef.current.value,
        comments: [],
        imageSrc: await storageRef.getDownloadURL(),
        dateCreated: date,
        likes: [],
        userId: profileUserId,
      })
      .then(setVisibility(false));
  };

  return (
    <>
      {addPhotoVisibility && visibility && (
        <>
          <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none bg-opacity-75 bg-black-light">
            {/*content*/}
            <div className="border-0 md:mx-auto rounded-lg shadow-lg relative md:h-screen  bg-white  focus:outline-none my-4 md:w-9/12 w-10/12 mx-auto">
              <div className="fixed md:top-3 md:right-3 top-1 right-1">
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
                  onClick={closeWindow}
                >
                  <path
                    clip-rule="evenodd"
                    d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="md:mt-10 md:p-10 mt-5 p-10">
                <img
                  src={src}
                  alt={alt}
                  className="w-auto h-96 mx-auto rounded-lg text-center object-cover"
                />

                <div className="md:m-10 my-7">
                  <label className="w-48 px-4 py-3 bg-blue-light font-bold text-sm rounded-lg text-white  tracking-wide  border border-blue cursor-pointer  ">
                    <span className="text-base leading-normal">
                      Select file from computer
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <span class="align-middle text-center">
                    <input
                      type="text"
                      placeholder="Write a caption"
                      className="focus:outline-none w-full text-center"
                      //   required={true}
                      ref={inputRef}
                    />
                  </span>
                </div>
                <div className="m-10">
                  <button
                    className="bg-blue-light font-bold text-sm rounded text-white w-20 h-8"
                    onClick={handleSubmit}
                  >
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
