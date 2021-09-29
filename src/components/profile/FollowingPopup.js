import { useState, useEffect } from "react";
import FollowerRow from "./FollowerRow";
import { getFollowers } from "../../services/firebase";

export default function FollowingPopUp({
  followingVisibility,
  closeWindow,
  following,
}) {
  const [followingList, setFollowingList] = useState([]);
  useEffect(() => {
    const getFollowingList = async () => {
      const listFollowing = await getFollowers(following);
      await setFollowingList(listFollowing);
    };
    if (following) {
      getFollowingList();
    }
  }, [following]);
  return (
    <>
      {followingVisibility && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-black-light">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-96 w-96 bg-white outline-none focus:outline-none">
              <div className="flex border-b border-gray-primary w-full h-8 mt-2 px-5 ">
                <p className="mx-auto font-bold pl-6">Following</p>
                <img
                  alt=""
                  src="/images/cancel.png"
                  className="cursor-pointer h-5 mt-0.5"
                  onClick={closeWindow}
                />
              </div>

              {followingList ? (
                followingList.map((following) => (
                  <FollowerRow
                    key={following?.userId}
                    following={true}
                    username={following?.username}
                    fullName={following?.fullName}
                  />
                ))
              ) : (
                <p className="ml-16 p-5">You're not following anyone</p>
              )}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
