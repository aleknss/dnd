import { useEffect } from "react";

export function PageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | dnd compendium`;

    return () => {};
  }, [title]);
}
