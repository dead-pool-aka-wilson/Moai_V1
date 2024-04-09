"use client";
import { Home, Start, Deposit, Create, MyPage } from "@/app/components";
import { useNavbar } from "../context/Navigation";
import { useState, useEffect, useRef } from "react";

export default function Main() {
  const [loaded, setLoaded] = useState(false);
  const { tab } = useNavbar();

  useEffect(() => {
    if (localStorage.getItem("moai-spending")) {
      setLoaded(true);
    }
  }, []);

  if (loaded)
    return (
      <>
        {tab === 0 && <Home />}
        {tab === 2 && <Create />}
        {tab === 3 && <Deposit />}
        {tab === 4 && <MyPage />}
      </>
    );

  return <Start />;
}
