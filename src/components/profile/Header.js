import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import FollowerPopUp from "./FollowerPopUp";
import FollowingPopUp from "./FollowingPopup";

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    followers = [],
    username: profileUsername,
  },
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [visible, setVisible] = useState("invisible");
  const [followingVisible, setFollowingVisible] = useState("invisible");
  const activeButtonFollow = user.username && user.username !== profileUsername;
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  const handleClick = () => {
    if (visible === "invisible") {
      setVisible("visible");
    }
  };

  const handleClickFollowing = () => {
    if (followingVisible === "invisible") {
      setFollowingVisible("visible");
    }
  };

  const closeWindow = () => {
    if (visible === "visible") {
      setVisible("invisible");
    }
  };

  const closeWindowFollowing = () => {
    if (followingVisible === "visible") {
      setFollowingVisible("invisible");
    }
  };

  useEffect(() => {
    // console.log(user);
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
    // console.log("followers", followers);
  }, [user.username, profileUserId]);
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${user.username} profile picture`}
            src={`/images/avatars/${profileUsername}.jpeg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeButtonFollow && (
            <button
              className="bg-blue-light font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4 text-black-light">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `}photos
              </p>
              <p
                className={`mr-10 ${
                  visible === "invisible" ? "cursor-pointer" : null
                }`}
                onClick={followingVisible === "invisible" ? handleClick : null}
              >
                {visible ? (
                  <FollowerPopUp
                    closeWindow={closeWindow}
                    visible={visible}
                    followers={followers}
                  />
                ) : null}
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? "follower" : "followers"}
              </p>
              <p
                className={`mr-10 ${
                  followingVisible === "invisible" ? "cursor-pointer" : null
                }`}
                onClick={handleClickFollowing}
              >
                {visible ? (
                  <FollowingPopUp
                    closeWindow={closeWindowFollowing}
                    visible={followingVisible}
                    followers={followers}
                  />
                ) : null}
                <span className="font-bold">{following.length}</span>
                {` `}following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
};
