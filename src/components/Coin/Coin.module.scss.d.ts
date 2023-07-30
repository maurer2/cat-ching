import globalClassNames from '../../style.d';
declare const classNames: typeof globalClassNames & {
  readonly 'container': 'container';
  readonly 'header': 'header';
  readonly 'title': 'title';
  readonly 'title--hidden': 'title--hidden';
  readonly 'image': 'image';
  readonly 'buttonGroup': 'buttonGroup';
  readonly 'button': 'button';
  readonly 'hidden-text': 'hidden-text';
};
export = classNames;
