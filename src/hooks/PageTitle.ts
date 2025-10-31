import { useEffect } from "react";

export function PageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - dnd`;

    return () => {};
  }, [title]);
}
