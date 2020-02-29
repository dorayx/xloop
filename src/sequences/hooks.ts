import {nullOrValue} from '../utils/nullOrValue';

const container: HooksContainer = {
  presend: [],
  prereject: [],
};

function use(hook: keyof HooksContainer, fn: UseFn) {
  container[hook].push(fn);
}

const _hooks: Partial<Hooks> = {};
const keys = Object.keys(container) as HookKeys[];
for (const key of keys) {
  _hooks[key] = {
    use: fn => use(key, fn),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run: async function(result: any, context: any) {
      const all = container[key];
      for await (const fn of all) {
        result = nullOrValue(await fn.call(this, result, context), result);
      }
      return result;
    },
  };
}

export const hooks = _hooks as Hooks;
