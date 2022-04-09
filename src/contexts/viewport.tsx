import React, { useEffect, useMemo, useState } from 'react';

const defaultValue = {
  isMobile: false,
  setIsMobile: () => {},
};

export const viewportContext = React.createContext(defaultValue);
const mobileWidth = 1000;

type ViewportContextProviderProps = {
  children: React.ReactNode
}
export function ViewportContextProvider({ children }: ViewportContextProviderProps) {
  const [isMobile, setMobileState] = useState(false);

  useEffect(() => {
    const width = document.documentElement.clientWidth;
    if (width < mobileWidth && !isMobile) {
      setMobileState(true);
    } else if (width >= mobileWidth && isMobile) {
      setMobileState(false);
    }
    window.addEventListener('resize', checkSize);
  }, []);

  const contextValue = useMemo(() => ({ isMobile, setIsMobile: checkSize }), [isMobile]);

  return (
    <viewportContext.Provider value={contextValue}>
      {children}
    </viewportContext.Provider>
  );

  function checkSize() {
    const width = document.documentElement.clientWidth;
    if (width < mobileWidth && !isMobile) {
      setMobileState(true);
    } else if (width >= mobileWidth) {
      setMobileState(false);
    }
  }
}
