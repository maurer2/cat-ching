import type Money from '../../types/Money';

export type HeaderProps = {
  targetAmount: Money;
  onReset: () => void;
};
