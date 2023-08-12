import React, {
  useImperativeHandle, useRef, forwardRef,
} from 'react';
import type { ForwardedRef, MouseEvent } from 'react';
import clsx from 'clsx';

import style from './OverlayNew.module.scss';
import type * as Types from './OverlayNew.types';

const OverlayNew = forwardRef((
  { renderOverlay }: Types.OverlayProp,
  ref: ForwardedRef<Types.OverlayNewRefFields>,
): JSX.Element => {
  const dialogContainerElement = useRef<HTMLDivElement>(null);
  const dialogElement = useRef<HTMLDialogElement>(null);

  const isActive = renderOverlay() !== null;

  useImperativeHandle(ref, () => ({
    showOverlay(): void {
      // setIsVisible(true);
      dialogElement.current?.show();
    },
    hideOverlay(): void {
      // setIsVisible(false);
      dialogElement.current?.close();
    },
  }), []);

  // useEffect(() => {
  //   let timeout = -1;

  //   if (!isLoading) {
  //     overlayNew.current?.showOverlay();

  //     timeout = window.setTimeout(() => {
  //       overlayNew.current?.hideOverlay();
  //     }, 3000);
  //   }

  //   return () => {
  //     window.clearTimeout(timeout);
  //   };
  // }, [overlayNew, isLoading]);

  function handleCloseButtonClick(event: MouseEvent): void {
    console.log('handleOverlayClick', event);
  }

  return (
    <div
      ref={dialogContainerElement}
      className={clsx(style.overlayNewContainer, {
        [style.overlayNewContainerIsActive]: isActive,
      })}
      data-testid="overlayNew"
    >
      {isActive && (
        <dialog
          ref={dialogElement}
          className={style.overlayNew}
        >
          {renderOverlay(handleCloseButtonClick)}
        </dialog>
      )}
    </div>
  );
});

export default OverlayNew;
