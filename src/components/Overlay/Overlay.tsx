import React from 'react';

import style from './Overlay.module.scss';
import type * as Types from './Overlay.types';

function Overlay({ onReset }: Types.OverlayProps): JSX.Element {
  return (
    <aside className={style.overlay} data-testid="overlay">
      <div className={style.wrapper}>
        <p className={style.overlayText}>
          Purrfect!
        </p>
        <button
          className={style.resetButton}
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}

export default Overlay;
