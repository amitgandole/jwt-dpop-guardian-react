import axios from "axios";

import useDpop from "../hooks/useDpop";
import { exportJWK } from "jose";

const useAxiosInterceptor = () => {
  const apiClient = axios.create();
  const { generateDpopProof } = useDpop();

  apiClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("dpop-token");
      if (!token) {
        return Promise.reject();
      }
      try {
        const { jwt: dpopProof, publicKey } = await generateDpopProof(
          config.url!,
          config.method!
        );
        const exportedPublicKey = await exportJWK(publicKey);

        config.headers["authorization"] = `DPoP ${token}`;
        config.headers["dpop"] = dpopProof;
        config.headers["x-public-key"] = JSON.stringify(exportedPublicKey);
      } catch (error) {
        return Promise.reject(error);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default useAxiosInterceptor;
