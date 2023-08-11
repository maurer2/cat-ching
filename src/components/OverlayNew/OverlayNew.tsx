import React, {
  useImperativeHandle, useRef, forwardRef, useState,
} from 'react';
import type { ForwardedRef, PropsWithChildren, MouseEvent } from 'react';

import style from './OverlayNew.module.scss';
import type * as Types from './OverlayNew.types';

const OverlayNew = forwardRef((
  { renderOverlay }: PropsWithChildren<Types.OverlayProp>,
  ref: ForwardedRef<Types.OverlayNewRefFields>,
): JSX.Element => {
  const dialogContainerElement = useRef<HTMLDivElement>(null);
  const dialogElement = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const overlayQueue: number[] = [];

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

  function handleOverlayClick(event: MouseEvent): void {
    setIsVisible(false);
    console.log('handleOverlayClick', event);
  }

  return (
    <div
      ref={dialogContainerElement}
      className={isVisible ? style.overlayNewContainer : undefined}
      data-testid="overlayNew"
    >
      <dialog
        ref={dialogElement}
        className={style.overlayNew}
      >
        {renderOverlay(handleOverlayClick)}
      </dialog>
    </div>
  );
});

export default OverlayNew;
