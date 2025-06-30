import { useAtomValue, useSetAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { currentLanguageAtom } from "../../app/stores/environment";
import { Button } from "../../shared/components/ui/button";

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
      <Button
        onClick={handleLanguageToggle}
        variant="outline"
        color="secondary"
        size="small"
        title={t("switch_language")}
      >
        {currentLanguage === "ko" ? "EN" : "한글"}
      </Button>
    </div>
  );
}

export { LanguageToggle };
