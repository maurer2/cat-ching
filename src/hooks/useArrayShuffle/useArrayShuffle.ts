import { useState, useEffect, useCallback } from 'react';

type ArrayWithRandomIndex<T> = {
  newIndex: number;
  data: T;
}[];

export default function useArrayShuffle<T>(
  sortedArray: ReadonlyArray<T>,
): readonly [ReadonlyArray<T>, () => void] {
  const [shuffledArray, setShuffledArray] = useState(sortedArray);

  const shuffle = useCallback(() => {
    // assign random number to each entry
    const arrayWithRandomNumbers: ArrayWithRandomIndex<T> = sortedArray.map((data) => ({
      newIndex: Math.random(),
      data,
    }));

    // sort by randomNumber
    arrayWithRandomNumbers.sort((entryA, entryZ) => (entryA.newIndex > entryZ.newIndex ? 1 : -1));

    // remove randomNumber again
    const newShuffledArray = arrayWithRandomNumbers.map(({ data }) => data);

    setShuffledArray(newShuffledArray);
  }, [sortedArray]);

  useEffect(() => {
    shuffle();
  }, [sortedArray, shuffle]);

  return [shuffledArray, shuffle] as const;
}
