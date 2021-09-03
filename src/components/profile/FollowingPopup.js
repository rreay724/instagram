import { useState, useRef, useEffect } from "react";
import FollowerRow from "./FollowerRow";
import { getFollowers } from "../../services/firebase";
// import useFollowers from "../../hooks/use-followers";

export default function FollowingPopUp({ visible, closeWindow, following }) {
  const [followingList, setFollowingList] = useState([]);
  useEffect(() => {
    const getFollowingList = async () => {
      const followingList = await getFollowers(following);
      await setFollowingList(followingList);
    };
    if (following) {
      getFollowingList();
    }
    console.log(followingList);
  }, [following]);
  return (
    <div
      className={`overflow-auto z-30 m-0 p-0 h-2/6 w-96  border rounded-xl bg-white text-left fixed ${visible}`}
    >
      <div className="flex border-b border-gray-primary w-full h-8 mt-2 px-5 ">
        <p className="mx-auto font-bold pl-6">Following</p>
        <img
          src="/images/cancel.png"
          className="cursor-pointer h-5 mt-0.5"
          onClick={closeWindow}
        />
      </div>

      {followingList ? (
        followingList.map((following) => (
          <FollowerRow
            following={true}
            username={following?.username}
            fullName={following?.fullName}
          />
        ))
      ) : (
        <p className="ml-16 p-5">You're not following anyone</p>
      )}
    </div>
  );
}
