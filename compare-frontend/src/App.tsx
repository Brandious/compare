import { CurrentUserProvider } from "./context/CurrentClientContext";
import { Home } from "./pages";

function App() {
  return (
    <CurrentUserProvider>
      <Home />
    </CurrentUserProvider>
  );
}

export default App;
