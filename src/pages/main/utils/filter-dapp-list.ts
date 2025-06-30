import type { Device } from "../../../shared/types/environment";
import type { DappItem } from "../apis/dapp-list/schema";

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

  // 현재 디바이스에 대한 설정이 없으면 표시하지 않음
  if (dapp.visibility.platform[currentDevice] === undefined) {
    return false;
  }

  // 현재 디바이스에 대한 설정 값 반환
  return dapp.visibility.platform[currentDevice] === true;
}

// export function filterDAppList(dappList: DappItem[]) {
//   return dappList.filter((dapp) => {
//     if (dapp.visibility === undefined || dapp.visibility === null) {
//       return true;
//     }
//   });
// }
