import { useRef, useState, useEffect } from 'react';

export function useSidebarState() {
  const sidebarStateRef = useRef(window.innerWidth >= 1000);
  const [open, setOpen] = useState(sidebarStateRef.current);

  const setSidebarStateWithRef = (newState) => {
    sidebarStateRef.current = newState;
    setOpen(newState);
    // Update the stored value in session storage
    window.sessionStorage.setItem('sidebarState', JSON.stringify(newState));
  };

  // Read the initial state from session storage or a cookie
  useEffect(() => {
    const storedState = window.sessionStorage.getItem('sidebarState');
    if (storedState !== null) {
      setOpen(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    // Function to check the screen width and update the sidebar state
    const checkScreenWidth = () => {
      if (window.innerWidth < 1100) {
        setSidebarStateWithRef(false);
      } else {
        setSidebarStateWithRef(true);
      }
    };

    // Initial check when the component mounts
    checkScreenWidth();

    // Add a resize event listener to continuously check screen width
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return [open, setSidebarStateWithRef];
}
