import React from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import AuthStack from "./authusers";
import UserStack from "./users";

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}
