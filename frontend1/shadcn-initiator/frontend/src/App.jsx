import { ThemeProvider } from "./context/ThemeProvider";
import Hero from "./pages/components/hero";
import Hero1 from "./pages/components/Hero1";
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Hero1 />
      </div>
    </ThemeProvider>
  );
}

export default App;
