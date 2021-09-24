import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import {
  isUserFollowingProfile,
  toggleFollow,
  uploadProfilePhoto,
  getUserPhotosByUserId,
} from "../../services/firebase";
import FollowerPopUp from "./FollowerPopUp";
import FollowingPopUp from "./FollowingPopup";
import UploadPhotoPopup from "../UploadPhotoPopup";
import { firebase } from "../../lib/firebase";

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
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [followerVisible, setFollowerVisible] = useState(false);
  const [followingVisible, setFollowingVisible] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(false);
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

  // ====== upload profile pic =====
  const onFileChange = (e) => {
    uploadProfilePhoto({ e, profileUserId, setProfileVisibility });
  };

  // ===================================

  // handles photo upload pop up when clicking on profile pic
  const handleProfilePicClick = () => {
    if (profileVisibility === false) {
      setProfileVisibility(true);
    } else if (profileVisibility === true) {
      setProfileVisibility(false);
    }

    setFollowingVisible(false);
    setFollowerVisible(false);
  };

  // handles popup window when clicking on followers
  const handleClickFollower = () => {
    if (followerVisible === false) {
      setFollowerVisible(true);
    } else if (followerVisible === true) {
      setFollowerVisible(false);
    }
  };

  // handles popup window when clicking on following
  const handleClickFollowing = () => {
    if (followingVisible === false) {
      setFollowingVisible(true);
    } else if (followingVisible === true) {
      setFollowingVisible(false);
    }
  };

  useEffect(() => {
    setFollowerVisible(false);
    setFollowingVisible(false);
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

    const getUrl = async () => {
      const photo = await getUserPhotosByUserId(profileUserId);
      await setImageUrl(photo[0]?.url);
    };

    if (profileUserId) {
      getUrl();
      console.log(imageUrl);
    }
  }, [user.username, profileUserId, imageUrl]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container justify-center">
        {user.username && (
          <img
            onClick={
              profileUserId == user.userId ? handleProfilePicClick : null
            }
            className={`rounded-full h-40 w-40 flex ${
              profileUserId == user.userId ? "cursor-pointer" : null
            }`}
            src={`${imageUrl} ? ${imageUrl} : /images/avatars/default.jpeg`}
            onError={(e) => {
              e.target.src = "/images/avatars/default.jpeg";
            }}
            alt={""}
          />
        )}
      </div>
      {profileVisibility ? (
        <UploadPhotoPopup
          profileVisibility={profileVisibility}
          handleCancelClick={handleProfilePicClick}
          onFileChange={onFileChange}
        />
      ) : null}

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
              <div
                className={`mr-10 ${
                  followerVisible === false ? "cursor-pointer" : null
                }`}
                onClick={
                  followingVisible === false ? handleClickFollower : null
                }
              >
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? "follower" : "followers"}
              </div>
              {followerVisible && (
                <FollowerPopUp
                  closeWindow={handleClickFollower}
                  followerVisibility={followerVisible}
                  followers={followers}
                />
              )}
              <div
                className={`mr-10 ${
                  followingVisible === false ? "cursor-pointer" : null
                }`}
                onClick={handleClickFollowing}
              >
                <span className="font-bold">{following.length}</span>
                {` `}following
              </div>
              {followingVisible ? (
                <FollowingPopUp
                  closeWindow={handleClickFollowing}
                  followingVisibility={followingVisible}
                  following={following}
                />
              ) : null}
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
