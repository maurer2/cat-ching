import React from 'react';

import style from './Overlay.module.scss';

function Overlay() {
  return (
    <aside className={style.overlay}>
      <p className={style.overlayText}>
        Purrfect!
      </p>
    </aside>
  );
}

export default Overlay;
