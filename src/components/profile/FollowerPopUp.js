import { useState, useRef, useEffect } from "react";
import FollowerRow from "./FollowerRow";
import { getFollowers } from "../../services/firebase";

export default function FollowerPopUp({ visible, closeWindow, followers }) {
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
    <div
      className={`overflow-auto z-30 m-0 p-0 h-2/6 w-96  border rounded-xl bg-white text-left fixed ${visible}`}
    >
      <div className="flex border-b border-gray-primary w-full h-8 mt-2 px-5 ">
        <p className="mx-auto font-bold pl-6">Followers</p>
        <img
          src="/images/cancel.png"
          className="cursor-pointer h-5 mt-0.5"
          onClick={closeWindow}
        />
      </div>
      {followersList ? (
        followersList.map((follower) => (
          <FollowerRow
            key={follower?.docId}
            followerProfileDocId={follower.docId}
            following={true}
            username={follower?.username}
            fullName={follower?.fullName}
            userId={follower?.userId}
            visible={visible}
          />
        ))
      ) : (
        <p className="ml-16 p-5">No followers</p>
      )}
    </div>
  );
}
