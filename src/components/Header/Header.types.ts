import Money from '../../types/Money';

export type HeaderProps = {
  targetAmount: Money;
  handleReset: () => void;
};
