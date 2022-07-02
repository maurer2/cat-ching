import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly footer: 'footer';
  readonly detail: 'detail';
  readonly detailKey: 'detailKey';
  readonly detailValue: 'detailValue';
  readonly toggleButton: 'toggleButton';
};
export default classNames;
export type ClassNames =
  | 'footer'
  | 'detail'
  | 'detailKey'
  | 'detailValue'
  | 'toggleButton'
  | GlobalClassNames;
