import { useState, useEffect } from "react";

type SetValue<T> = (newValue: T) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);

      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );

      return;
    }

    try {
      const serializedValue = JSON.stringify(storedValue);

      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
