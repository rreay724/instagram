import React, { useState, useEffect, useContext } from "react";
import useUser from "../../hooks/use-user";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";

export default function Suggestions({ userId }) {
  const [profiles, setProfiles] = useState(null);

  // get suggested profiles
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId);
      setProfiles(response);
    }
    if (userId) {
      getSuggestedProfiles();
    }

    console.log("userId", userId);
  }, [userId]);
  // hint: use the firebase services
  // call the async function ^^^ within useEffect
  // store in state so
  // render (wait on the profiles as in "skeleton")
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = { userId: PropTypes.string };
