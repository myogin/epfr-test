import { useEffect, useState } from "react";

export const useScrollPositionBottom = (scrollFactor = 1) => {
  const [scrollPosition, setScrollPosition] = useState<any>("");

  useEffect(() => {
    const updatePosition = () => {
      const target = window.document.getElementById(
        "section-" + scrollFactor
      );

      if (target) {
        var headerOffset = window.innerHeight;
        var elementPosition = target.getBoundingClientRect().bottom;
        var checkBounderis = target.getBoundingClientRect();
        var offsetPosition = elementPosition - headerOffset;

        console.log(checkBounderis);
        if (offsetPosition < 200 && offsetPosition >=0) {
          // setScrollPosition("ok Sec Bottom " + scrollFactor + " offset " + offsetPosition + " element "+ elementPosition + " inner " +  window.innerHeight + " scroll y " + window.scrollY);
          setScrollPosition("Process" + scrollFactor);
        } else {
          // setScrollPosition("Not Ok Sec Bottom " + scrollFactor + " offset " + offsetPosition + " element " + elementPosition + " inner " +  window.innerHeight + " scroll y " + window.scrollY);
          setScrollPosition("NoProcess" + scrollFactor);
        }
      }
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};
