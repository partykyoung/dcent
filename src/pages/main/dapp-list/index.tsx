import type { DappItem as DappItemType } from "./apis/dapp-list/schema";

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

interface DappListProps {
  dapps: DappItemType[];
  onItemClick?: (dapp: DappItemType) => void;
  language?: "en" | "ko";
  loading?: boolean;
  emptyMessage?: string;
}

function DappList({
  dapps,
  onItemClick,
  language = "ko",
  loading = false,
  emptyMessage = "사용 가능한 DApp이 없습니다.",
}: DappListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-base-content/70">DApp 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (dapps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-base-content/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <p className="text-base-content/70 text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <div className="p-4 bg-base-200 border-b border-base-300">
        <h2 className="text-lg font-semibold text-base-content">디앱</h2>
        <p className="text-sm text-base-content/70 mt-1">
          {dapps.length}개의 DApp
        </p>
      </div>

      <div className="divide-y divide-base-300">
        {dapps.map((dapp) => (
          <DappItem
            key={dapp.id}
            dapp={dapp}
            onItemClick={onItemClick}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}

export { DappList };
