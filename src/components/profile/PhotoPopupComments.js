import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "../post/AddComment";

export default function PhotoPopupComments({
  docId,
  comments: allComments,
  posted,
  commentInput,
  caption,
}) {
  const [comments, setComments] = useState(allComments);
  const [showComments, setShowComments] = useState(false);

  const handleClickComments = () => {
    if (!showComments) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4 z-60 overflow-scroll">
        <p className="text-gray-base">{caption}</p>
        {comments.map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {comments.slice(1, comments.length).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              {showComments ? (
                <span className="mr-1 font-bold">{item.displayName}</span>
              ) : null}
            </Link>
            {showComments ? <span>{item.comment}</span> : null}
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      {/* <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      /> */}
    </>
  );
}

PhotoPopupComments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
