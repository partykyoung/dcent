export interface DappItem {
  id: string;
  name: string;
  icon: string;
  description: {
    en?: string;
    ko?: string;
  };
  supportedNetworks?: string[];
  visibility?: {
    platform?: {
      android?: boolean;
      ios?: boolean;
    };
    language?: {
      en?: boolean;
      ko?: boolean;
    };
    environment?: {
      dev?: boolean;
      stage?: boolean;
      prod?: boolean;
    };
  };
}
