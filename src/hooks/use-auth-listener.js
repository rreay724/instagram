import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

// listens for user logged in
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // we have a user - store user in local storage
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // no user - clear local storage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
}
