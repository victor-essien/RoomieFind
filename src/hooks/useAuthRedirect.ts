// useAuthRedirect.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";

export function useAuthRedirect(path: string) {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(path);
  }, [user]);
}
