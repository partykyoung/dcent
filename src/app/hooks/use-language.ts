import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { currentLanguageAtom } from "../stores/environment";

function useLanguage() {
  const setCurrentLanguage = useSetAtom(currentLanguageAtom);

  useEffect(() => {
    // 브라우저 언어 감지
    const detectLanguage = () => {
      const browserLanguage = navigator.language || navigator.languages[0];
      const lang = browserLanguage.startsWith("ko") ? "ko" : "en";
      setCurrentLanguage(lang);
    };

    // 초기 감지
    detectLanguage();

    // 언어 변경 감지 (언어 설정이 변경될 때)
    const handleLanguageChange = () => {
      detectLanguage();
    };

    // 이벤트 리스너 등록
    window.addEventListener("languagechange", handleLanguageChange);

    // 클린업
    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, [setCurrentLanguage]);
}

export { useLanguage };
