// Local Imports
import AppRouting from "@/routing/routing";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <AppRouting />
    </ThemeProvider>
  );
}

export default App;
