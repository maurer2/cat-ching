import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly overlay: 'overlay';
  readonly wrapper: 'wrapper';
  readonly overlayText: 'overlayText';
  readonly resetButton: 'resetButton';
};
export default classNames;
export type ClassNames = 'overlay' | 'wrapper' | 'overlayText' | 'resetButton' | GlobalClassNames;
