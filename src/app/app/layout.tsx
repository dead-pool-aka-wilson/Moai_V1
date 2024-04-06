import { NavBar } from "./_components";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      {children}
      <NavBar />
    </div>
  );
}
