import { useState, useEffect } from "react";
import FollowerRow from "./FollowerRow";
import { getFollowers } from "../../services/firebase";
import useUser from "../../hooks/use-user";

export default function FollowerPopUp({
  followerVisibility,
  closeWindow,
  followers,
}) {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();
  const [followersList, setFollowersList] = useState([]);

  useEffect(() => {
    const getFollowerList = async () => {
      const followerList = await getFollowers(followers);
      await setFollowersList(followerList);
    };
    if (followers) {
      getFollowerList();
    }
  }, [followers]);

  return (
    <>
      {followerVisibility && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-black-light">
            {/*content*/}
            <div className="overflow-scroll border-0 rounded-lg shadow-lg relative flex flex-col h-96 w-96 bg-white outline-none focus:outline-none">
              <div className="flex border-b border-gray-primary w-full h-8 mt-2 px-5 pb-2">
                <p className="mx-auto font-bold pl-6">Followers</p>
                <img
                  src="/images/cancel.png"
                  className="cursor-pointer h-5 mt-0.5"
                  onClick={closeWindow}
                  alt=""
                />
              </div>

              {followersList ? (
                followersList.map((follower) => (
                  <FollowerRow
                    key={follower?.userId}
                    following={true}
                    username={follower?.username}
                    fullName={follower?.fullName}
                  />
                ))
              ) : (
                <p className="p-5 mx-auto">No followers</p>
              )}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
