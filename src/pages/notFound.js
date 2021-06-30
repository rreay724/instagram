import React, { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = "Not Found!";
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto">
        <p className="text-center text-2xl ">Not Found!</p>
      </div>
    </div>
  );
}

export default NotFound;
