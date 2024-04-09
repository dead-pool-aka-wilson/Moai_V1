import { useNavbar } from "@/app/context/Navigation";
import Image from "next/image";

export default function NavBar() {
  const { setTab } = useNavbar();

  return (
    <nav className="flex h-[56px] w-full items-center justify-between gap-12 border-t border-solid bg-white p-[20px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div onClick={() => setTab(0)}>
          <Image src="/icons/home.svg" width={24} height={24} alt="home" />
        </div>
        <div>
          <Image
            src="/icons/search.svg"
            width={20}
            height={20}
            alt="discover"
          />
        </div>
      </div>
      <div onClick={() => setTab(2)}>
        <Image src="/icons/plus.svg" width={150} height={150} alt="create" />
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <div onClick={() => setTab(3)}>
          <Image src="/icons/money.svg" width={24} height={24} alt="moai" />
        </div>

        <div onClick={() => setTab(4)}>
          <Image src="/icons/person.svg" width={20} height={20} alt="my page" />
        </div>
      </div>
    </nav>
  );
}
