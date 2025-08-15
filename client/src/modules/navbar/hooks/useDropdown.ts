import { useState, useRef, useEffect } from "react";

export const useDropdown = <T extends HTMLElement>() => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<T>(null);

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isOpen, toggle, close, ref };
};
