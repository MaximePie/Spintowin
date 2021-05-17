import React, {useEffect, useState} from "react";
const defaultValue = {
  isMobile: false,
  setIsMobile: () => {}
}

export const viewportContext = React.createContext(defaultValue);

export function ViewportContextProvider ({children}) {

  const [isMobile, setMobileState] = useState(false);

  useEffect(() => {
    const width = document.documentElement.clientWidth;
    if (width < 900 && !isMobile) {
      setMobileState(true);
    }
    else if (width >= 900 && isMobile) {
      setMobileState(false);
    }
    window.addEventListener("resize", checkSize);
  }, []);

  return (
    <viewportContext.Provider value={{isMobile: isMobile}}>
      {children}
    </viewportContext.Provider>
  );

  function checkSize() {
    const width = document.documentElement.clientWidth;
    if (width < 900 && !isMobile) {
      setMobileState(true);
    }
    else if (width >= 900) {
      setMobileState(false);
    }
  }
}
