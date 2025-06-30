import type { Device } from "../types/environment";

/**
 * 브라우저의 현재 언어 코드를 가져옵니다.
 * @returns 언어 코드 (예: 'kr', 'en')
 */
export const getLanguage = (): string => {
  const DEFAULT_LANGUAGE = "ko";

  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const language = navigator.language || DEFAULT_LANGUAGE;

  return language.split("-")[0].toLowerCase();
};

export function getDeviceType(): Device {
  if (typeof window === "undefined") {
    return "web";
  }

  const userAgent = window.navigator.userAgent;

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "ios";
  }

  if (/Android/i.test(userAgent)) {
    return "android";
  }

  return "web";
}
