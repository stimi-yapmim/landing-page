"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  lang: "id",
  setLang: () => {},
  t: (id) => id,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("id");

  // Persist preference
  useEffect(() => {
    const saved = localStorage.getItem("stimi-lang");
    if (saved === "en" || saved === "id") setLangState(saved);
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("stimi-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
