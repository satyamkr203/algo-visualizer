import { SortingAlgorithmProvider } from './context/Visualizer.jsx';
import SortingVisualizer from './components/SortingVisualizer.jsx';

function App() {
  return (
    <SortingAlgorithmProvider>
      <SortingVisualizer />
    </SortingAlgorithmProvider>
  );
}

export default App;
