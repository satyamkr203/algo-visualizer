
function partition(array, begin, finish, animations) {
    let i = begin;
    let j = finish + 1;
    const pivot = array[begin];
  
    while (true) {
      while (array[++i] <= pivot) {
        if (i === finish) break;
        animations.push([[i], false]);
      }
  
      while (array[--j] >= pivot) {
        if (j === begin) break;
        animations.push([[j], false]);
      }
  
      if (j <= i) break;
  
      animations.push([[i, array[j]], true]);
      animations.push([[j, array[i]], true]);
      [array[i], array[j]] = [array[j], array[i]];
    }
  
    animations.push([[begin, array[j]], true]);
    animations.push([[j, array[begin]], true]);
    [array[begin], array[j]] = [array[j], array[begin]];
  
    return j;
  }
  
  function runQuickSort(array, begin, finish, animations) {
    if (begin < finish) {
      const part = partition(array, begin, finish, animations);
      runQuickSort(array, begin, part - 1, animations);
      runQuickSort(array, part + 1, finish, animations);
    }
  }
  
  export function generateQuickSortAnimationArray(isSorting, array, runAnimation) {
    if (isSorting) return;
    if (array.length <= 1) return array;
  
    const animations = [];
    const auxiliaryArray = array.slice();
    runQuickSort(auxiliaryArray, 0, array.length - 1, animations);
    runAnimation(animations);
  }
  