import { SortingAlgorithmProvider } from "@/context/visualizer";
import SortingVisualizer from "@/components/SortingVisualizer";

function App() {
  return (
    <SortingAlgorithmProvider>
      <SortingVisualizer />
    </SortingAlgorithmProvider>
  );
}

export default App;
