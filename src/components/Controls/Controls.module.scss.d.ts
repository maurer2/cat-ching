import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly controls: 'controls';
  readonly button: 'button';
};
export default classNames;
export type ClassNames = 'controls' | 'button' | GlobalClassNames;
