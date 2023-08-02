import { useEffect, useState } from "react";

export const useScrollPositionBottom = (scrollFactor = 1) => {
  const [scrollPosition, setScrollPosition] = useState<any>("");

  useEffect(() => {
    const updatePosition = () => {
      const target = window.document.getElementById(
        "section-header-" + scrollFactor
      );

      if (target) {
        var headerOffset = 0;
        var elementPosition = target.getBoundingClientRect().bottom;
        var offsetPosition = elementPosition - headerOffset;

        if (offsetPosition == 0) {
          setScrollPosition("okSecBottom" + scrollFactor);
        } else {
          setScrollPosition("NotOkSecBottom" + scrollFactor);
        }
      }
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};
