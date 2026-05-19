import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [cognitiveFocus, setCognitiveFocus] = useState(false);
  const [screenReaderActive, setScreenReaderActive] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;

    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  useEffect(() => {
    if (cognitiveFocus) {
      document.body.classList.add('cognitive-focus-mode');
    } else {
      document.body.classList.remove('cognitive-focus-mode');
    }
  }, [cognitiveFocus]);

  return (
    <AccessibilityContext.Provider value={{ 
      fontSize, setFontSize, 
      highContrast, setHighContrast,
      cognitiveFocus, setCognitiveFocus,
      screenReaderActive, setScreenReaderActive
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useA11y = () => useContext(AccessibilityContext);