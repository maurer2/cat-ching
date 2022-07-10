import React, { useCallback } from 'react';

import style from './Controls.module.scss';
import * as Types from './Controls.types';

function Controls({ onAddAmount, onSubtractAmount }: Types.ControlsProps): JSX.Element {
  const ControlButton = useCallback(
    ({ handleOnClick, children }): JSX.Element => (
      <button
        className={style.button}
        onClick={handleOnClick}
        type="button"
      >
        {children}
      </button>
    ),
    [],
  );

  return (
    <aside
      className={style.controls}
      data-testid="controls"
    >
      <ControlButton handleOnClick={onAddAmount}>Add amount</ControlButton>
      <ControlButton handleOnClick={onSubtractAmount}>Subtract amount</ControlButton>
    </aside>
  );
}

export default Controls;
