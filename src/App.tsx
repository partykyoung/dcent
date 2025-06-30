import { TanstackQueryProvider } from "./app/providers/tanstack-query-provider";
import { MainPage } from "./pages/main";
import { useI18nSync } from "./shared/hooks/use-i18n-sync";

function App() {
  // 언어 상태와 i18n 동기화
  useI18nSync();

  return (
    <TanstackQueryProvider>
      <MainPage />
    </TanstackQueryProvider>
  );
}

export default App;
