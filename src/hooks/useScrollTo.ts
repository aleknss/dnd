import { useCallback } from 'react';

export const useScrollTo = (defaultHeaderHeight: number = 128) => {
  const scrollTo = useCallback((elementId: string) => {
    const targetElement = document.querySelector(elementId);
    if (!targetElement) return;
    
    // Buscar el header con clase bg-dirty-white (ClassHeader) y obtener su altura actual
    const classHeader = document.querySelector('.bg-dirty-white.sticky') as HTMLElement;
    const actualHeaderHeight = classHeader ? classHeader.offsetHeight : defaultHeaderHeight;
    
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - actualHeaderHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, [defaultHeaderHeight]);

  return { scrollTo };
};
