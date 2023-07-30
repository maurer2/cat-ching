import globalClassNames from '../../style.d';
declare const classNames: typeof globalClassNames & {
  readonly header: 'header';
  readonly title: 'title';
  readonly detail: 'detail';
  readonly detailKey: 'detailKey';
  readonly detailValue: 'detailValue';
  readonly resetButton: 'resetButton';
};
export = classNames;
