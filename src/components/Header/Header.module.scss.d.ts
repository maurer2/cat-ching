import globalClassNames, { ClassNames as GlobalClassNames } from '../..style.d';
declare const classNames: typeof globalClassNames & {
  readonly header: 'header';
  readonly title: 'title';
  readonly detail: 'detail';
  readonly detailKey: 'detailKey';
  readonly detailValue: 'detailValue';
  readonly resetButton: 'resetButton';
};
export default classNames;
export type ClassNames =
  | 'header'
  | 'title'
  | 'detail'
  | 'detailKey'
  | 'detailValue'
  | 'resetButton'
  | GlobalClassNames;
