import { useState, useEffect } from "react";
import { Api } from "../axios";

const useFetch = (url, dependencies) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await Api.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [...dependencies]);

  return {
    data,
    loading,
    error
  };
};

export default useFetch;
