import React, { useEffect, useState } from "react";

const useApi = ({ method = "GET", url }) => {
  // console.clear();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiCall = async (requestBody) => {
    console.log(`API is called with method: ${method}`);
    setIsLoading(true);
    try {
      const requestOption = { method };

      if (method == "POST" && requestBody) {
        requestOption.body = JSON.stringify(requestBody);
        requestOption.headers = {
          "Content-Type": "application/json",
        };
        // console.log(`api is called with : ${requestOption.body}`);
      }

      const response = await fetch(url, requestOption);
      if (!response.ok) {
        throw new Error("Can't Post the Data");
      }
      const responseData = await response.json();
      setData(responseData);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (method === "GET") {
      apiCall();
    }
  }, [url]);

  return { data, error, isLoading, apiCall };
};

export default useApi;
