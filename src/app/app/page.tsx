"use client";
import { Home, Start, Deposit } from "@/app/components";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import { useNavbar } from "../context/Navigation";
import { useState, useEffect } from "react";

export default function Main() {
  const [loaded, setLoaded] = useState(false);
  const { tab } = useNavbar();

  const clearKey = () => {
    localStorage.removeItem("moai-spending");
    location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("moai-spending")) {
      setLoaded(true);
    }
  }, []);

  if (loaded)
    return (
      <>
        {tab === 0 && <Home />}
        {tab === 3 && <Deposit />}

        <div onClick={clearKey}>clear key</div>
      </>
    );

  return <Start />;
}
