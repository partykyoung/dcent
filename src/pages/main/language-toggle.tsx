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
        className="btn btn-sm btn-outline bg-base-100 hover:bg-base-200"
        title={t('switch_language')}
      >
        {currentLanguage === "ko" ? "EN" : "한글"}
      </button>
    </div>
  );
}

export { LanguageToggle };
