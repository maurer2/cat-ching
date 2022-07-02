import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly container: 'container';
  readonly main: 'main';
};
export default classNames;
export type ClassNames = 'container' | 'main' | GlobalClassNames;
