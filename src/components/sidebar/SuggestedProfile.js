import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserPhotosByUserId,
} from "../../services/firebase";

export default function SuggestedProfile({
  suggestedProfileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(suggestedProfileDocId, userId, false);
  }

  useEffect(() => {
    const getUrl = async () => {
      const photo = await getUserPhotosByUserId(profileId);
      await setImageUrl(photo[0]?.url);
    };

    if (profileId) {
      getUrl();
    }
  }, [imageUrl]);

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 h-8 flex mr-3"
          src={`${imageUrl} ? ${imageUrl} : /images/avatars/default.jpeg`}
          onError={(e) => {
            e.target.src = "/images/avatars/default.jpeg";
          }}
          alt={""}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-light"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  suggestedProfileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
