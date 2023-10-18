import * as React from 'react';

const randomString = () => Math.random().toString(36).substr(2, 9);

const useStateWithCallbackLazy = initialValue => {
  const callbackRef = React.useRef(null);
  const [state, setState] = React.useState({
    value: initialValue,
    revision: randomString(),
  });

  /**
   *  React.useEffect() hook is not called when setState() method is invoked with same value(as the current one)
   *  Hence as a workaround, another state variable is used to manually retrigger the callback
   *  Note: This is useful when your callback is resolving a promise or something and you have to call it after the state update(even if UI stays the same)
   */
  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state.value);

      callbackRef.current = null;
    }
  }, [state.revision, state.value]);

  const setValueWithCallback = React.useCallback((newValue, callback) => {
    callbackRef.current = callback;

    return setState({
      value: newValue,
      // Note: even if newValue is same as the previous value, this random string will re-trigger useEffect()
      // This is intentional
      revision: randomString(),
    });
  }, []);

  return [state.value, setValueWithCallback];
};

export default useStateWithCallbackLazy;
