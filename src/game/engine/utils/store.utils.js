/**
 * Creates store with helpful utils to work with: primitive, array, object.
 * @param {T} value
 * @returns {store<T>}
 */
export function createStore(value) {
  const store = {
    value,
    set,
    get,
    log,
    update,
  };

  /**
   * Reassign store value with new value
   * @param {T} newValue
   * @returns {void}
   */
  function set(newValue) {
    store.value = newValue;
  }

  /**
   * Returns store value
   * @returns {T}
   */
  function get() {
    return store.value;
  }

  /**
   * Smart update
   * @overload
   * @param {(el: unknown, arr: unknown[]) => unknown} callback
   * @returns {void}
   */
  /**
   * Smart update
   * @overload
   * @param {number} index
   * @param {unknown} value
   * @returns {void}
   */
  /**
   * Smart update
   * @overload
   * @param {[...string[], unknown | ((old: unknown) => unknown)]} args
   * @returns {void}
   */
  /**
   * Smart update
   * @overload
   * @param {unknown} value
   * @returns {void}
   */
  function update(...args) {
    if (Array.isArray(store.value) && typeof args[0] === "function") {
      const callback = args[0];

      set(store.value.map((el) => callback(el, store.value)));
      return;
    } else if (Array.isArray(store.value) && typeof args[0] === "number") {
      const index = args[0];
      const newValueByIndex = args[1];

      store.value[args[index]] = newValueByIndex;

      set([...store.value]);

      return;
    }

    if (typeof store.value === "object") {
      const lastArg = args.at(-1);
      const path = args.slice(0, -1);

      const setIn = (obj, [key, ...restPath]) => {
        if (restPath.length > 0) {
          return { ...obj, [key]: setIn(obj[key], restPath) };
        }

        const newValue =
          typeof lastArg === "function" ? lastArg(obj[key]) : lastArg;

        return { ...obj, [key]: newValue };
      };

      set(setIn(store.value, path));

      return;
    }

    const newValue = args[0];

    set(newValue);
  }

  /**
   * Log of array.
   *
   * By providing array indexes as arguments specific elements can be logged.
   * @overload
   * @param {...number} indexes - Indexes of elements to log.
   * @returns {void}
   */
  /**
   * Log of object.
   *
   * By providing Key path as arguments specific element can be logged.
   * @overload
   * @param {...string} path - Key path to a nested value, applied recursively.
   * @returns {void}
   */
  /**
   * Lo of value.
   * @overload
   * @returns {void}
   */
  function log(...args) {
    if (Array.isArray(store.value) && args.length > 0) {
      const elementsToLog = [];

      for (const index of args) {
        elementsToLog.push(store.value[index]);
      }

      console.log(...elementsToLog);

      return;
    }

    if (typeof store.value === "object" && args.length > 0) {
      const lastArg = args.at(-2);
      let innerValue = store.value;

      for (let i = 0; i < args.length - 2; i++) {
        const key = args[i];

        innerValue = innerValue[key];
      }

      console.log(innerValue[lastArg]);
      return;
    }

    console.log(store.value);
  }

  return store;
}