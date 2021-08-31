export default function FollowerRow({ fullName, username, following }) {
  return (
    <div className="flex w-full p-3">
      <img
        className="rounded-full h-8 w-8 mt-1"
        src={`/images/avatars/${username}.jpeg`}
      />
      <div className="pl-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-gray-primary text-sm">{fullName}</p>
      </div>
      <button className="border border-gray-primary rounded-lg w-20 h-8 font-bold text-sm mx-auto mt-1 absolute right-0 mr-3">
        {following === true ? "Remove" : "Follow"}
      </button>
    </div>
  );
}
