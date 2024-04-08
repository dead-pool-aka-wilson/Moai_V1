export default function Wrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-full w-full grow flex-col items-center justify-between overflow-y-scroll ">
      {children}
    </main>
  );
}
