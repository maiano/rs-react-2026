import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    return savedValue ?? initialValue;
  });

  const updateValue = (value: string) => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, updateValue] as const;
}
