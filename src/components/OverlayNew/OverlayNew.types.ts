import type { MouseEvent, ReactElement } from 'react';
// export type OverlayNewProps = {
//   onReset: () => void,
// };

export type OverlayProp = {
  renderOverlay: (
    handleOverlayClick?: (event: MouseEvent) => void,
    handleCloseButtonClick?: (event: MouseEvent) => void
  ) => ReactElement | null,
  // onClose?: (event: SyntheticEvent) => void
};

export type OverlayNewRefFields = {
  showOverlay: () => void,
  hideOverlay: () => void,
};
