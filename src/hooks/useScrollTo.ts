import { useCallback } from "react";

export const useScrollTo = (defaultHeaderHeight: number = 128) => {
  const scrollTo = useCallback(
    (elementId: string) => {
      const targetElement = document.querySelector(elementId);
      if (!targetElement) return;

      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - defaultHeaderHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    [defaultHeaderHeight]
  );

  return { scrollTo };
};
