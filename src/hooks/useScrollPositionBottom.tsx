import { useEffect, useState } from "react";

export const useScrollPositionBottom = (scrollFactor = 1) => {
  const [scrollPositionBottom, setScrollPositionBottom] = useState<any>("");

  useEffect(() => {
    const updatePosition = () => {
      const target = window.document.getElementById(
        "section-" + scrollFactor
      );

      if (target) {
        var headerOffset = window.innerHeight;
        var elementPosition = target.getBoundingClientRect().bottom;
        var offsetPosition = elementPosition - headerOffset;

        // console.log(checkBounderis);
        if (offsetPosition < 50 && offsetPosition >=0) {
          // setScrollPosition("ok Sec Bottom " + scrollFactor + " offset " + offsetPosition + " element "+ elementPosition + " inner " +  window.innerHeight + " scroll y " + window.scrollY);
          setScrollPositionBottom("Process" + scrollFactor);
        } else {
          // setScrollPosition("Not Ok Sec Bottom " + scrollFactor + " offset " + offsetPosition + " element " + elementPosition + " inner " +  window.innerHeight + " scroll y " + window.scrollY);
          setScrollPositionBottom("NoProcess" + scrollFactor);
        }
      }
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPositionBottom;
};
