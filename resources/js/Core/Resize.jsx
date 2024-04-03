import { useState, useEffect } from 'react';

const useWindowSize = (x) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - x,
  });
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight - x,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
