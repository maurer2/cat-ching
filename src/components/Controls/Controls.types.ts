import Money from '../../types/Money';

export type ControlsProps = {
  onAddAmount: (amount: Money) => void,
  onSubtractAmount: (amount: Money) => void,
};
