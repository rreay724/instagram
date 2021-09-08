import { Link } from "react-router-dom";
import { useState } from "react";

export default function FollowerRow({ fullName, username, following }) {
  return (
    <div className="flex w-full p-3">
      <Link to={`/p/${username}`}>
        <img
          className="rounded-full h-8 w-8 mt-1 cursor-pointer"
          src={`/images/avatars/${username}.jpeg`}
          onError={(e) => {
            e.target.src = "/images/avatars/default.jpeg";
          }}
        />
      </Link>

      <div className="pl-3">
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm cursor-pointer hover:underline">
            {username}
          </p>
        </Link>

        <p className="text-gray-primary text-sm">{fullName}</p>
      </div>
      <button className="border border-gray-primary rounded-lg w-20 h-8 font-bold text-sm mx-auto mt-1 absolute right-0 mr-3">
        {following === true ? "Remove" : "Follow"}
      </button>
    </div>
  );
}
