import { useRef, useState, useEffect } from 'react';

export function useSidebarState(initialState = false) {
  const sidebarStateRef = useRef(initialState);
  const [open, setOpen] = useState(sidebarStateRef.current);

  const setSidebarStateWithRef = (newState) => {
    sidebarStateRef.current = newState;
    setOpen(newState);
  };

  useEffect(() => {
    setOpen(sidebarStateRef.current);
  }, []);

  return [open, setSidebarStateWithRef];
}