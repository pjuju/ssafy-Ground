import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [ storedValue, setStoredValue ] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        return value;
      } else {
        localStorage.setItem(key, defaultValue);
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(key, newValue);
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [ storedValue, setValue ];
};
