import { useEffect, useState } from "react";
import useAxiosInterceptor from "../API/axiosInstance";
import { BASE_API_URL } from "../utils/constants";

const useSecureData = () => {
  const apiClient = useAxiosInterceptor();
  const [data, setData] = useState({});

  const fetchSecureData = async () => {
    try {
      const response = await apiClient.get(BASE_API_URL + "secure-data");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSecureData();
  }, []);
  return { data };
};

export default useSecureData;
