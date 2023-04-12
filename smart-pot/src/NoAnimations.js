import { useEffect } from "react";

const NoAnimations = () => {
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add("no-animations");
    };

    const handleMouseUp = () => {
      document.body.classList.remove("no-animations");
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return null;
};

export default NoAnimations;
