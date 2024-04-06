import Image from 'next/image';
import { Page } from './_components';

export default function Home() {
  return (
    <Page>
      <div className='my-3 inline-flex w-full items-start justify-between p-2.5'>
        <div className='grow items-start justify-start gap-2.5 text-center text-xl font-bold text-zinc-950'>
          MEME OF ALL INTERNET
        </div>
        <div className='relative h-[20px] w-[20px]'>
          <Image src='/icons/search.svg' layout='fill' alt='search' />
        </div>
      </div>
      <div className='flex w-full grow flex-col items-center justify-center gap-4 rounded-3xl bg-[#e8eaee] p-4'>
        <div className='flex flex-col items-stretch gap-4'>
          <div className='relative h-[320px] w-[320px] overflow-hidden rounded-3xl  '>
            <Image src='/sample/meme.png' layout='fill' alt='meme' />
          </div>
          <div className='flex w-full items-center gap-5'>
            <div className='relative h-[40px] w-[40px] overflow-hidden rounded-full'>
              <Image src='/sample/pfp.png' layout='fill' alt='meme' />
            </div>
            <div className='text-2xl font-light'>{`user name`}</div>
          </div>
          <div className='w-full'></div>
        </div>

        <div className='w-full grow'></div>
      </div>
    </Page>
  );
}
