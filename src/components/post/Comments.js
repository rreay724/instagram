import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  const [showComments, setShowComments] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClickComments = React.useCallback(() => {
    if (!showComments) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }

    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  });

  console.log("showComments", showComments);
  console.log("toggle", toggle);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 1 && (
          <p
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={handleClickComments}
          >
            {!showComments && !toggle ? "View all comments" : "Hide comments"}
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              {showComments && toggle ? (
                <span className="mr-1 font-bold">{item.displayName}</span>
              ) : null}
            </Link>
            {showComments && toggle ? <span>{item.comment}</span> : null}
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
