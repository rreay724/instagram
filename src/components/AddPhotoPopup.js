import { useState, useRef } from "react";
import { addPhoto } from "../services/firebase";
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
            <div className="border-0 mx-44 rounded-lg shadow-lg relative h-screen w-screen bg-white  focus:outline-none">
              <div className="border-b border-gray-primary w-full h-8 mt-2 px-5 ">
                <img
                  src="/images/cancel.png"
                  className="cursor-pointer h-5 mt-0.5"
                  onClick={closeWindow}
                />
              </div>
              <div className="mt-10 p-10">
                <img
                  src={src}
                  alt={alt}
                  className="w-auto h-96 mx-auto rounded-lg text-center"
                />

                <div className="m-10">
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
