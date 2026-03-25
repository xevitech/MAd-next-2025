import React, { useLayoutEffect, useState } from "react";

export const TextOverFlow = (ref, callback) => {
  const [isOverflow, setIsOverflow] = useState(undefined);
  useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;
      setIsOverflow(hasOverflow);
      if (callback) callback(hasOverflow);
    };
    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
