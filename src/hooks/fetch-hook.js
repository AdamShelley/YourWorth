import { useCallback, useState, useRef, useEffect } from "react";

export const useFetchHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      //
      setLoading(true);

      // In case of errors (changing page too quick etc)
      const httpAbort = new AbortController();
      activeHttpRequests.current.push(httpAbort);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbort.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (req) => req !== httpAbort
        );

        if (!response.ok) throw new Error(responseData.message);
        setLoading(false);
        return responseData;
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { sendRequest, loading, error, clearError };
};
