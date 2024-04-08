import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="flex h-[56px] w-full items-center justify-between gap-12 border-t border-solid bg-white p-[20px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div>
          <a href="/" className="text-black">
            <Image src="/icons/home.svg" width={24} height={24} alt="home" />
          </a>
        </div>
        <div>
          <a href="/discover" className="text-black">
            <Image
              src="/icons/search.svg"
              width={20}
              height={20}
              alt="discover"
            />
          </a>
        </div>
      </div>
      <div>
        <Image src="/icons/plus.svg" width={150} height={150} alt="create" />
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <div>
          <a href="/moai" className="text-black">
            <Image src="/icons/money.svg" width={24} height={24} alt="moai" />
          </a>
        </div>

        <div>
          <a href="/register" className="text-black">
            <Image
              src="/icons/person.svg"
              width={20}
              height={20}
              alt="my page"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
