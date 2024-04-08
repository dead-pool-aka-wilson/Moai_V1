"use client";
import { Home, Start, Deposit } from "@/app/components";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import { useState, useEffect } from "react";

export default function Main() {
  const [loaded, setLoaded] = useState(false);

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
        {/* <Home /> */}
        <Deposit />
        <div onClick={clearKey}>clear key</div>
      </>
    );

  return <Start />;
}
