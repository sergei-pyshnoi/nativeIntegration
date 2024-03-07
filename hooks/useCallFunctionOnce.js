import { useRef } from "react";

const useCallFunctionOnce = (fn) => {
  const ref = useRef(false);

  return (...args) => {
    if (!ref.current) {
      try {
        fn(...args);
        ref.current = true;
      } catch (e) {}
    }
  };
};

export default useCallFunctionOnce;
