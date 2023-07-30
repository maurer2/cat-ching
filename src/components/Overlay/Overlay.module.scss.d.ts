import globalClassNames from '../../style.d';
declare const classNames: typeof globalClassNames & {
  readonly overlay: 'overlay';
  readonly wrapper: 'wrapper';
  readonly overlayText: 'overlayText';
  readonly resetButton: 'resetButton';
};
export = classNames;
