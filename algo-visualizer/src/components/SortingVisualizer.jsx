import { Select } from '../components/input/Select.jsx';
import { Slider } from '../components/input/Slider.jsx';
import { useSortingAlgorithmContext } from '../context/Visualizer.jsx';
import { generateAnimationArray, algorithmOptions, sortingAlgorithmsData } from '../lib/utils.js';
import { useState, useEffect } from "react";

export default function SortingVisualizer() {
  const {
    arrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    animationSpeed,
    setAnimationSpeed,
    resetArrayAndAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  const [isBlinking, setIsBlinking] = useState(false);

  const handleStart = () => {
    generateAnimationArray(selectedAlgorithm, isSorting, arrayToSort, runAnimation);
  };

  const handleSelectChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleSliderChange = (e) => {
    setAnimationSpeed(Number(e.target.value));
  };

  useEffect(() => {
    if (!isSorting && arrayToSort.length > 0) {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false); 
      }, 2000); 
    }
  }, [isSorting, arrayToSort]);

  const algorithmInfo = sortingAlgorithmsData[selectedAlgorithm];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="max-w-lg text-center">
          <h2 className="text-xl font-semibold">{algorithmInfo?.title}</h2>
          <p className="mt-2 text-sm text-gray-400">{algorithmInfo?.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <strong>Worst Case:</strong>
              <p className="text-gray-300">{algorithmInfo?.worstCase}</p>
            </div>
            <div>
              <strong>Average Case:</strong>
              <p className="text-gray-300">{algorithmInfo?.averageCase}</p>
            </div>
            <div>
              <strong>Best Case:</strong>
              <p className="text-gray-300">{algorithmInfo?.bestCase}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="content-container" className="flex-1 flex items-end justify-center gap-1 p-4 overflow-hidden">
        {arrayToSort.map((value, idx) => (
          <div
            key={idx}
            className={`array-line bg-purple-500 default-line-color transition-all ${
              isBlinking ? 'blink' : ''
            }`}
            style={{ width: "6px", height: `${value}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 p-4 bg-gray-800">
        <Select
          options={algorithmOptions}
          defaultValue={selectedAlgorithm}
          onChange={handleSelectChange}
          isDisabled={isSorting}
        />
        <Slider
          value={animationSpeed}
          handleChange={handleSliderChange}
          isDisabled={isSorting}
        />
        <button
          disabled={isSorting}
          onClick={resetArrayAndAnimation}
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
        >
          Reset Array
        </button>
        <button
          disabled={isSorting}
          onClick={handleStart}
          className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-500"
        >
          Start Sorting
        </button>
      </div>
    </div>
  );
}
