import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly 'container': 'container';
  readonly 'button': 'button';
  readonly 'image-wrapper': 'image-wrapper';
  readonly 'image': 'image';
  readonly 'title': 'title';
};
export default classNames;
export type ClassNames =
  | 'container'
  | 'button'
  | 'image-wrapper'
  | 'image'
  | 'title'
  | GlobalClassNames;
