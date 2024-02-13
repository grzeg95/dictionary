export const BreakpointsMin = {
  es: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

export const Breakpoints = {
  extraSmall: {
    selector: `(min-width: 0) and (max-width: ${BreakpointsMin.sm - 1}px)`,
  },
  small: {
    selector: `(min-width: ${BreakpointsMin.sm}px) and (max-width: ${BreakpointsMin.md - 1}px)`,
  },
  medium: {
    selector: `(min-width: ${BreakpointsMin.md}px) and (max-width: ${BreakpointsMin.lg - 1}px)`,
  },
  large: {
    selector: `(min-width: ${BreakpointsMin.lg}px) and (max-width: ${BreakpointsMin.xl - 1}px)`,
  },
  extraLarge: {
    selector: `(min-width: ${BreakpointsMin.xl}px)`
  }
};
