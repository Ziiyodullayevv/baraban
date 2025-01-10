import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className='py-14'>
      <div className='container mx-auto px-10'>
        <div className='text-center flex justify-center items-center flex-col mt-10'>
          <h1 className='text-[40px] max-w-[700px] uppercase font-bold'>
            Barabanni aylantiring va qishki chegirmangizni toping!
          </h1>
          <p className='max-w-[700px] text-xl font-normal'>
            Qadrli mijozlarimiz! Ushbu qish mavsumida siz uchun maxsus aksiyani
            taqdim etamiz.{' '}
            <strong className='font-semibold'>Barabanni aylantiring</strong> va
            o‘zingiz uchun maxsus{' '}
            <strong className='font-semibold'>chegirma</strong> yoki{' '}
            <strong className='font-semibold'>sovg‘ani</strong> yutib oling!
          </p>

          <Link
            to={'/baraban'}
            className='w-[250px] hover:bg-green-500 flex justify-center items-center h-[50px] text-white font-semibold bg-green-400 mt-10 rounded-md'
          >
            Hoziroq Boshlash
          </Link>
        </div>
      </div>
    </section>
  );
}
