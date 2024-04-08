import { createContext, useContext, useState, ReactNode } from "react";

const NavbarContext = createContext({ tab: 0, setTab: (tab: number) => {} });
interface NavProviderProps {
  children: ReactNode;
}

export default function NavBarNavigation(props: NavProviderProps) {
  const { children } = props;
  const [tab, setTab] = useState(0);

  return (
    <NavbarContext.Provider value={{ tab, setTab }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
