import React, { useEffect } from "react";

export const useClickOutside = (ref: React.MutableRefObject<any>, cb: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) =>
      ref.current && !ref.current.contains(event.target) ? cb() : null;

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
