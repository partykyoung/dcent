import type { DappItem } from "../apis/dapp-list/schema";
import type {
  Device,
  Language,
  Environment,
} from "../../../../shared/types/common";

export function filterPlatform(dapp: DappItem, currentDevice: Device): boolean {
  if (!dapp.visibility?.platform) {
    return true;
  }

  // 현재 디바이스에 대한 설정 값 반환
  return (
    dapp.visibility.platform[
      currentDevice as keyof typeof dapp.visibility.platform
    ] === true
  );
}

export function filterLanguage(
  dapp: DappItem,
  currentLanguage: Language
): boolean {
  if (!dapp.visibility?.language) {
    return true;
  }

  // 현재 언어에 대한 설정 값 반환
  return (
    dapp.visibility.language[
      currentLanguage as keyof typeof dapp.visibility.language
    ] === true
  );
}

export function filterEnvironment(
  dapp: DappItem,
  currentEnvironment: Environment
): boolean {
  if (!dapp.visibility?.environment) {
    return true;
  }

  // 현재 환경에 대한 설정 값 반환
  return (
    dapp.visibility.environment[
      currentEnvironment as keyof typeof dapp.visibility.environment
    ] === true
  );
}

export function filterDappList({
  dappList,
  currentDevice,
  currentLanguage,
  currentEnvironment,
}: {
  dappList: DappItem[];
  currentDevice: Device;
  currentLanguage: Language;
  currentEnvironment: Environment;
}): DappItem[] {
  return dappList.filter((dapp) => {
    // visibility가 없으면 모든 조건에서 표시
    if (!dapp.visibility) {
      return true;
    }

    // 플랫폼 필터링
    if (!filterPlatform(dapp, currentDevice)) {
      return false;
    }

    // 언어 필터링
    if (!filterLanguage(dapp, currentLanguage)) {
      return false;
    }

    // 환경 필터링
    if (!filterEnvironment(dapp, currentEnvironment)) {
      return false;
    }

    return true;
  });
}
