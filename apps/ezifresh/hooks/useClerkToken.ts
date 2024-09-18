import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export function useClerkToken() {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  return { token };
}
