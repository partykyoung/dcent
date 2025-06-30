import { TanstackQueryProvider } from "./app/providers/tanstack-query-provider";
import { MainPage } from "./pages/main";
import { useI18nSync } from "./app/hooks/use-i18n-sync";
import { useDevice } from "./app/hooks/use-device";
import { useLanguage } from "./app/hooks/use-language";

function App() {
  useDevice();
  useLanguage();
  useI18nSync();

  return (
    <TanstackQueryProvider>
      <MainPage />
    </TanstackQueryProvider>
  );
}

export default App;
