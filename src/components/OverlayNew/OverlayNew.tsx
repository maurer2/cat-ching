import React, {
  useImperativeHandle, useRef, forwardRef, useState,
} from 'react';
import type { ForwardedRef, PropsWithChildren } from 'react';

import style from './OverlayNew.module.scss';
import type * as Types from './OverlayNew.types';

// eslint-disable-next-line max-len
const OverlayNew = forwardRef(({ children }: PropsWithChildren, ref: ForwardedRef<Types.OverlayNewRefFields>): JSX.Element => {
  const dialogContainerElement = useRef<HTMLDivElement>(null);
  const dialogElement = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    showOverlay(): void {
      setIsVisible(true);
      dialogElement.current?.show();
    },
    hideOverlay(): void {
      setIsVisible(false);
      dialogElement.current?.close();
    },
  }), [setIsVisible]);

  return (
    <div
      ref={dialogContainerElement}
      className={isVisible ? style.overlayNewContainer : undefined}
      data-testid="overlayNew"
    >
      <div className={style.wrapper}>
        <dialog ref={dialogElement}>
          {children}
        </dialog>
      </div>
    </div>
  );
});

export default OverlayNew;
