import type { DappItem } from "../apis/dapp-list/schema";

export function filterPlatform(
  dapp: DappItem,
  currentDevice: keyof NonNullable<
    NonNullable<DappItem["visibility"]>["platform"]
  >
): boolean {
  if (!dapp.visibility?.platform) {
    return true;
  }

  // 현재 디바이스에 대한 설정 값 반환
  return dapp.visibility.platform[currentDevice] === true;
}

export function filterLanguage(
  dapp: DappItem,
  currentLanguage: keyof NonNullable<
    NonNullable<DappItem["visibility"]>["language"]
  >
): boolean {
  if (!dapp.visibility?.language) {
    return true;
  }

  // 현재 언어에 대한 설정 값 반환
  return dapp.visibility.language[currentLanguage] === true;
}

export function filterEnvironment(
  dapp: DappItem,
  currentEnvironment: keyof NonNullable<
    NonNullable<DappItem["visibility"]>["environment"]
  >
): boolean {
  if (!dapp.visibility?.environment) {
    return true;
  }

  // 현재 환경에 대한 설정 값 반환
  return dapp.visibility.environment[currentEnvironment] === true;
}

export function filterDappList({
  dappList,
  currentDevice,
  currentLanguage,
  currentEnvironment,
}: {
  dappList: DappItem[];
  currentDevice: keyof NonNullable<
    NonNullable<DappItem["visibility"]>["platform"]
  >;
  currentLanguage: keyof NonNullable<
    NonNullable<DappItem["visibility"]>["language"]
  >;
  currentEnvironment: keyof NonNullable<
    NonNullable<DappItem["visibility"]>["environment"]
  >;
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
