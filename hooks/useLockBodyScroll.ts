import { useEffect } from "react";

// Bloquea el scroll del body cuando `locked` es true (útil para menú móvil)
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    const original = document.body.style.overflow;
    if (locked) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [locked]);
}
