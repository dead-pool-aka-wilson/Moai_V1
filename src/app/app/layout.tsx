import { NavBar } from './_components';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-full flex-col'>
      {children}
      <NavBar />
    </div>
  );
}
