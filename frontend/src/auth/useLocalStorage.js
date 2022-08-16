import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return value;
      } else {
        if (defaultValue !== null) {
          localStorage.setItem(key, defaultValue);
        }
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      if(newValue === null) {
        localStorage.removeItem("token");
      }
      else {
        window.localStorage.setItem(key, newValue);
      }     
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
