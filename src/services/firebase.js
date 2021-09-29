import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

// get user from the firestore where userId === user passed from auth
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));

  return user;
}

// get suggested setProfiles
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id (karl's profile)
  profileId, // the user that karl requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  suggestedProfileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(suggestedProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getFollowers(followerIds) {
  if (followerIds.length > 0) {
    const result = await firebase
      .firestore()
      .collection("users")
      .where("userId", "in", followerIds)
      .get();

    const followers = await Promise.all(
      await result.docs.map(async (item) => ({
        ...item.data(),
        docId: item.id,
      }))
    );
    return followers;
  }
}

// `export const getSaveData = async (postedId) => {
//   const array = [postedId];
//   const snapshot = await db.collection('posts').get();
//   const data = snapshot.docs.map((doc) => ({ postedId: doc.id,
//   ...doc.data() }));
//   return data;
//   };`

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return photos;
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}

export async function uploadProfilePhoto({
  e,
  profileUserId,
  setProfileVisibility,
}) {
  const db = firebase.firestore();
  const storage = firebase.storage();
  const storageRef = storage.ref(`${profileUserId}/${e.target.files[0].name}`);
  await storageRef.put(e.target.files[0]);
  db.collection("profilePics")
    .doc(profileUserId)
    .set({
      imageName: e.target.files[0].name,
      url: await storageRef.getDownloadURL(),
      userId: profileUserId,
    })
    .then(setProfileVisibility(false));
}

export async function getUserPhotosByUserId(profileUserId) {
  const result = await firebase
    .firestore()
    .collection("profilePics")
    .where("userId", "==", profileUserId)
    .get();

  const profilePic = await Promise.all(
    result.docs.map(async (item) => ({
      ...item.data(),
      docId: item.id,
    }))
  );

  return profilePic;
}

export async function deleteUserPhotoByUserId(profileUserId) {
  const result = await firebase
    .firestore()
    .collection("profilePics")
    .doc(profileUserId);

  result.delete();
}
