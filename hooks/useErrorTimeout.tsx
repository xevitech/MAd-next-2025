import { useEffect } from 'react';

const useErrorTimeout = (errorState, setErrorState, errorExpireTime = 5000) => {
  useEffect(() => {
    if (errorState) {
      const timeOutObj = setTimeout(() => {
        setErrorState(false);
      }, errorExpireTime);

      return () => {
        clearTimeout(timeOutObj);
      };
    }
  }, [errorState, setErrorState, errorExpireTime]);
};

export default useErrorTimeout;