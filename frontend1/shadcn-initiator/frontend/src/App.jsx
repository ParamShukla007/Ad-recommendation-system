import { ThemeProvider } from "./context/ThemeProvider";
import Hero from "./pages/components/hero";
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Hero />
      </div>
    </ThemeProvider>
  );
}

export default App;
