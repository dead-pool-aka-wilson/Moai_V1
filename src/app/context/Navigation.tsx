import { createContext, useContext, useState, ReactNode, useMemo } from "react";

const NavbarContext = createContext({
  tab: 0,
  setTab: (tab: number) => {},
  memeId: "",
  setMemeId: (memeId: string) => {}
});
interface NavProviderProps {
  children: ReactNode;
}

export default function NavBarNavigation(props: NavProviderProps) {
  const { children } = props;
  const [tab, setTab] = useState(0);
  const [memeId, setMemeId] = useState<string>("");

  return (
    <NavbarContext.Provider value={{ tab, setTab, memeId, setMemeId }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
