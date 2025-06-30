import { TanstackQueryProvider } from "./app/providers/tanstack-query-provider";
import { MainPage } from "./pages/main";

function App() {
  return (
    <TanstackQueryProvider>
      <MainPage />
    </TanstackQueryProvider>
  );
}

export default App;
