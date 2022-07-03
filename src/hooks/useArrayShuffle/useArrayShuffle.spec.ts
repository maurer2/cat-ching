import { renderHook } from '@testing-library/react';
import customHook from './useArrayShuffle';

describe('useArrayShuffle', () => {
  const setup = (props: number[]) => renderHook(() => customHook(props));

  it('should return array of the same length', () => {
    const { result } = setup([1, 2, 3, 4, 5]);

    expect(Array.isArray(result.current[0])).toBeTruthy();
    expect(result.current[0].length).toBe(5);
  });

  it('should return array that contains all original entries', () => {
    const { result } = setup([1, 2, 3, 4, 5]);

    expect(result.current[0]).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
  });

  it('should shuffle the array', () => {
    const { result } = setup([1, 2, 3, 4, 5]);

    const shuffledArray: ReadonlyArray<typeof result.current[0][number]> = result.current[0];
    const sortedArray = [...shuffledArray].sort();

    expect(result.current[0]).not.toEqual(sortedArray);
  });
});
