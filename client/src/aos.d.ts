declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    offset?: number;
    delay?: number;
    startEvent?: string;
    disable?: string | boolean | Function;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
  }

  interface AOS {
    init(options?: AosOptions): void;
    refresh(hard?: boolean): void;
  }

  const aos: AOS;
  export default aos;
}