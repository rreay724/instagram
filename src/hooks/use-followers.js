import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useFollowers({ followerIds }) {
  const userIds = [followerIds];
}
