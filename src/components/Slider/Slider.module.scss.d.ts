import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly slider: 'slider';
  readonly slide: 'slide';
};
export default classNames;
export type ClassNames = 'slider' | 'slide' | GlobalClassNames;
