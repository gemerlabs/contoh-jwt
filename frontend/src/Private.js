import { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";

export default function Private({ children }) {
  const [secret, setSecret] = useState(null);
  const { token } = useAuthContext();

  const handlePrivatePage = async () => {
    const localToken = localStorage.getItem("_token");
    const data = await fetch("http://localhost:3001/private", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    });

    console.log(token);

    const result = await data.json();
    setSecret(result.message);
  };

  useEffect(() => {
    console.log(token);
    handlePrivatePage();
  }, []);

  return (
    <div>
      {!secret ? "Anda tidak berhak melihat isi dari halaman ini" : secret}
    </div>
  );
}
