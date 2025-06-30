import { useQuery } from "@tanstack/react-query";
import { fetchDappList, fetchDappListInDev } from "./apis/dapp-list/api";
import type { DappItem as DappItemType } from "./apis/dapp-list/schema";
import { filterDappList } from "./utils/filter-dapp-list";
import { useAtomValue } from "jotai";
import {
  currentDeviceAtom,
  currentLanguageAtom,
} from "../../../app/stores/environment";

const isDev = import.meta.env.DEV;

interface DappItemProps {
  dapp: DappItemType;
  onItemClick?: (dapp: DappItemType) => void;
  language?: "en" | "ko";
}

function DappItem({ dapp, onItemClick, language = "ko" }: DappItemProps) {
  const handleClick = () => {
    onItemClick?.(dapp);
  };

  const getDescription = () => {
    return (
      dapp.description[language] ||
      dapp.description.en ||
      dapp.description.ko ||
      ""
    );
  };

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-base-200 cursor-pointer transition-colors border-b border-base-300 last:border-b-0"
      onClick={handleClick}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div className="avatar mr-4">
          <div className="w-12 h-12 rounded-xl">
            <img
              src={dapp.icon}
              alt={dapp.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-icon.png";
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base text-base-content truncate">
            {dapp.name}
          </h3>
          <p className="text-sm text-base-content/70 truncate mt-1">
            {getDescription()}
          </p>
          {dapp.supportedNetworks && dapp.supportedNetworks.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {dapp.supportedNetworks.slice(0, 3).map((network, index) => (
                <div key={index} className="badge badge-sm badge-outline">
                  {network}
                </div>
              ))}
              {dapp.supportedNetworks.length > 3 && (
                <div className="badge badge-sm badge-ghost">
                  +{dapp.supportedNetworks.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="ml-4 text-base-content/50">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

function DappList() {
  const currentDevice = useAtomValue(currentDeviceAtom);
  const currentLanguage = useAtomValue(currentLanguageAtom);
  const { data, isLoading, error } = useQuery({
    queryKey: ["dappList"],
    queryFn: isDev ? fetchDappListInDev : fetchDappList,
    select: (data) => {
      return filterDappList({
        dappList: data,
        currentDevice,
        currentLanguage,
        currentEnvironment: import.meta.env.MODE,
      });
    },
  });

  console.log(data);

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <span className="loading loading-spinner loading-lg" />
          <p className="mt-4 text-base-content/70">목록을 불러오는 중...</p>
        </div>
      )}
      {error && <div>목록을 불러올 수 없습니다.</div>}
      {data && (
        <>
          {data.length === 0 && <></>}
          {data.length > 0 && (
            <ul>
              <li className="mb-[16px]">
                {data.map((dapp) => (
                  <DappItem
                    key={dapp.id}
                    dapp={dapp}
                    // onItemClick={onItemClick}
                    // language={language}
                  />
                ))}
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export { DappList };
