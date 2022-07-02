import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly 'container': 'container';
  readonly 'header': 'header';
  readonly 'title': 'title';
  readonly 'title--hidden': 'title--hidden';
  readonly 'image': 'image';
  readonly 'buttonGroup': 'buttonGroup';
  readonly 'button': 'button';
};
export default classNames;
export type ClassNames =
  | 'container'
  | 'header'
  | 'title'
  | 'title--hidden'
  | 'image'
  | 'buttonGroup'
  | 'button'
  | GlobalClassNames;
