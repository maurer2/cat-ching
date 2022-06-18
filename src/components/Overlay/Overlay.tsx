import React from 'react';

import style from './Overlay.module.scss';
// import * as Types from './Overlay.types';

function Overlay(): JSX.Element {
  return (
    <aside className={style.overlay}>
      <p className={style.overlayText}>
        Purrfect!
      </p>
    </aside>
  );
}

export default Overlay;
