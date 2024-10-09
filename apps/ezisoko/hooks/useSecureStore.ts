import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useSecureStore(key: string) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      if (value) {
        setValue(value);
      }
    });
  }, []);

  const setItem = async (value: any) => {
    await SecureStore.setItemAsync(key, value);
    setValue(value);
  };

  const removeItem = async () => {
    await SecureStore.deleteItemAsync(key);
    setValue(null);
  };

  return { value, setItem, removeItem };
}
