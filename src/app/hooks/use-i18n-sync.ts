import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { currentLanguageAtom } from "../stores/environment";

export function useI18nSync() {
  const { i18n } = useTranslation();
  const currentLanguage = useAtomValue(currentLanguageAtom);

  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return { i18n };
}
