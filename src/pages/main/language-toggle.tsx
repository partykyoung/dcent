import { useAtomValue, useSetAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { currentLanguageAtom } from "../../app/stores/environment";

function LanguageToggle() {
  const { t } = useTranslation();
  const currentLanguage = useAtomValue(currentLanguageAtom);
  const setCurrentLanguage = useSetAtom(currentLanguageAtom);

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === "ko" ? "en" : "ko";
    setCurrentLanguage(newLanguage);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleLanguageToggle}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
        title={t("switch_language")}
      >
        {currentLanguage === "ko" ? "EN" : "한글"}
      </button>
    </div>
  );
}

export { LanguageToggle };
