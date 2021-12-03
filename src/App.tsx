import Layout from "./components/Layout";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Layout />
    </AppContextProvider>
  );
}

export default App;
