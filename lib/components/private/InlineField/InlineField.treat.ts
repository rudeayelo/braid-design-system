import { style } from 'sku/treat';
import getSize from './getSize';

export const realField = style({
  opacity: 0,
  zIndex: 1,
  selectors: {
    [`&:not(:disabled)`]: {
      cursor: 'pointer',
    },
  },
});

const fakeFieldBase = style({
  flexShrink: 0,
});

const fakeFieldSize = style(theme => {
  const size = getSize(theme);

  return {
    height: size,
    width: size,
  };
});

export const fakeField = [fakeFieldSize, fakeFieldBase];

export const label = style(theme => {
  // Uses mobile standard text to mirror behaviour in getSize
  const standardTextHeight =
    theme.typography.text.standard.mobile.rows * theme.grid;
  const offset = (getSize(theme) - standardTextHeight) / 2;

  return {
    paddingTop: offset,
    userSelect: 'none',
    selectors: {
      [`${realField}:not(:disabled) + * > ${fakeFieldBase} + &`]: {
        cursor: 'pointer',
      },
    },
  };
});

export const children = style(theme => {
  const size = getSize(theme);

  return {
    marginLeft: size,
    selectors: {
      [`${realField}:checked ~ &`]: {
        display: 'block',
      },
    },
  };
});

export const selected = style({
  selectors: {
    [`${realField}:checked + * > ${fakeFieldBase} > &`]: {
      opacity: 1,
    },
  },
});

export const focusOverlay = style({
  selectors: {
    [`${realField}:focus + * > ${fakeFieldBase} > &`]: {
      opacity: 1,
    },
  },
});

export const hoverOverlay = style({
  selectors: {
    [`${realField}:hover:not(:checked):not(:disabled) + * > ${fakeFieldBase} > &`]: {
      opacity: 1,
    },
  },
});

export const indicator = style({
  selectors: {
    [`${hoverOverlay} > &`]: {
      opacity: 0.2,
    },
  },
});

const checkboxScale = style({
  transform: 'scale(0.85)',
  selectors: {
    [`${realField}:active + * > ${fakeFieldBase} > * > &`]: {
      transform: 'scale(0.75)',
    },
  },
});

export const checkboxIndicator = [indicator, checkboxScale];

const radioScale = style({
  transform: 'scale(0.6)',
  selectors: {
    [`${realField}:active + * > ${fakeFieldBase} > * > &`]: {
      transform: 'scale(0.5)',
    },
  },
});

export const radioIndicator = [indicator, radioScale];
