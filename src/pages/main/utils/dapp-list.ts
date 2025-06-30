import type { DappItem } from "../apis/dapp-list/schema";

function filterDeviceCondition() {}

function filterEnvironmentCondition() {}

function filterLangaugeCondition() {}

function filterDAppList(dappList: DappItem[]) {
  return dappList.filter((dapp) => {
    if (dapp.visibility === undefined || dapp.visibility === null) {
      return true;
    }
  });
}

export { filterDAppList };
