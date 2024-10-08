import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { useState } from "react";
import { KeyLike } from "jose";

const useDpop = () => {
  const [publicKey, setPublicKey] = useState<KeyLike>();
  const generateDpopProof = async (url: string, method: string) => {
    const { publicKey, privateKey } = await generateKeyPair("ES256");
    const jwkPublicKey = await exportJWK(publicKey);

    const jwt = await new SignJWT({ htu: url, htm: method })
      .setProtectedHeader({ alg: "ES256", typ: "dpop+jwt", jwk: jwkPublicKey })
      .sign(privateKey);

    setPublicKey(publicKey);

    return { jwt, publicKey };
  };
  return { generateDpopProof, publicKey };
};

export default useDpop;
