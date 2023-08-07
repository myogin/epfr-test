import { useEffect, useState } from "react";

export const useScrollPosition = (scrollFactor = 1) => {
  const [scrollPosition, setScrollPosition] = useState<any>("");

  useEffect(() => {
    const updatePosition = () => {
      const target = window.document.getElementById(
        "section-header-" + scrollFactor
      );

      if (target) {
        var headerOffset = 0;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition - headerOffset;

        if (offsetPosition == 0) {
          setScrollPosition("okSec" + scrollFactor);
        } else {
          setScrollPosition("NotOkSec" + scrollFactor);
        }
      }
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  console.log("Scroll Pos: ", scrollPosition);

  return scrollPosition;
};
