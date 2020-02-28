// eslint-disable-next-line @typescript-eslint/no-explicit-any
type XHttpPresend = (result: any, context: RequestContext) => Promise<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type XHttpPreReject = (error: any, context: RequestContext) => Promise<any>;

type UseFn = XHttpPresend | XHttpPreReject;

interface HooksContainer {
  presend: XHttpPresend[];
  prereject: XHttpPreReject[];
}

type HookKeys = keyof HooksContainer;

type Hooks = {
  [K in keyof HooksContainer]: {
    use: (fn: UseFn) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run: <T = any>(result: T, ...args: any[]) => Promise<T>;
  };
};
