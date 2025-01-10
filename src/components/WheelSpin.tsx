import { useState, useEffect } from 'react';
import symbol from '../assets/symbol.png';
import gift from '../assets/gift.gif';
import gift2 from '../assets/give2.png';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { Input } from '../components/ui/input';
import axios from 'axios';

const WheelOfFortune = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [prizeHistory, setPrizeHistory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const prizes = [
    'ANATOMIK YOSHARISH',
    'RADIOLIFT',
    'KEYINGI SAFAR :)',
    'TERMOLEFT',
    'CHESKA+PEELING',
    'KEYINGI SAFAR :)',
    'SOCH MEZOTERAPIYA',
    "KO'Z BIOREVITALIZATSIYASI",
    'KEYINGI SAFAR :)',
    'Yuz MEZOTERAPIYA',
    'BOTEX 50% SKIDKA',
    'KEYINGI SAFAR :)',
  ];

  const TELEGRAM_BOT_TOKEN = '7619434666:AAGfUH57FYz0WXMKMFJii5jUNMH3pRG5ERs'; // Bot tokenini shu yerga kiriting
  const TELEGRAM_CHAT_ID = '961047307'; // Chat ID ni shu yerga kiriting

  const sendToTelegram = async (
    name: string,
    surname: string,
    phone: string,
    prizeHistory: any[]
  ) => {
    const message = `
      Yutgan foydalanuvchi:
      Ism: ${name}
      Familiya: ${surname}
      Telefon: ${phone}
      Yutuqlar: ${prizeHistory.join(', ')}
    `;

    try {
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }
      );
    } catch (error) {
      console.error('Telegramga yuborishda xatolik:', error);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const name = (document.getElementById('ism') as HTMLInputElement)?.value;
    const surnameElement = document.getElementById(
      'familiya'
    ) as HTMLInputElement | null;
    const phoneElement = document.getElementById(
      'telefon'
    ) as HTMLInputElement | null;

    if (!surnameElement || !phoneElement) {
      alert('Iltimos, barcha maydonlarni to‘ldiring.');
      return;
    }

    const surname = surnameElement.value;
    const phone = phoneElement.value;

    if (!name || !surname || !phone) {
      alert('Iltimos, barcha maydonlarni to‘ldiring.');
      return;
    }

    try {
      // Telegramga ma'lumot yuborish
      await sendToTelegram(name, surname, phone, prizeHistory);

      alert('Ma’lumot yuborildi!');
      setIsModalOpen2(false);
    } catch (error) {
      console.error('Failed to submit data:', error);
      alert('Ma’lumotni yuborishda xatolik yuz berdi.');
    }
  };

  useEffect(() => {
    const storedPrizeHistory = localStorage.getItem('prizeHistory');
    if (storedPrizeHistory) {
      setPrizeHistory(JSON.parse(storedPrizeHistory));
    }
    const storedSpinsLeft = localStorage.getItem('spinsLeft');
    if (storedSpinsLeft) {
      setSpinsLeft(JSON.parse(storedSpinsLeft));
    }
  }, []);

  useEffect(() => {
    if (prizeHistory.length > 0) {
      localStorage.setItem('prizeHistory', JSON.stringify(prizeHistory));
    }
    if (spinsLeft !== 3) {
      localStorage.setItem('spinsLeft', JSON.stringify(spinsLeft));
    }
  }, [prizeHistory, spinsLeft]);

  const createSectorPath = (startAngle: number, endAngle: number) => {
    const centerX = 200;
    const centerY = 200;
    const radius = 190;

    const start = {
      x: centerX + radius * Math.cos((startAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((startAngle * Math.PI) / 180),
    };

    const end = {
      x: centerX + radius * Math.cos((endAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((endAngle * Math.PI) / 180),
    };

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M${centerX},${centerY} L${start.x},${start.y} A${radius},${radius} 0 ${largeArcFlag} 1 ${end.x},${end.y}z`;
  };

  const spinWheel = () => {
    if (!isSpinning && spinsLeft > 0) {
      setIsSpinning(true);
      setResult('');

      const spins = 5 + Math.random() * 5;
      const newRotation = rotation + spins * 360;

      setRotation(newRotation);

      setTimeout(() => {
        const finalRotation = newRotation % 360;
        const sliceSize = 360 / prizes.length;
        const prizeIndex = Math.floor(
          (360 - (finalRotation % 360)) / sliceSize
        );
        const prize = prizes[prizeIndex % prizes.length];

        setResult(prize);
        setPrizeHistory((prev) => [...prev, prize]);
        setSpinsLeft(spinsLeft - 1);
        setIsSpinning(false);

        setIsModalOpen(true);
      }, 3000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      className={`flex min-h-[100vh] py-10 justify-center items-center`}
      style={{
        backgroundImage: `url(${'https://static.vecteezy.com/system/resources/previews/002/379/059/original/elegant-white-wave-background-free-vector.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex flex-col items-center gap-8 p-4'>
        <div className='relative max-w-[400px]'>
          <svg
            viewBox='0 0 400 400'
            className='w-full h-full'
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? 'transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)'
                : 'none',
            }}
          >
            <circle cx='200' cy='200' r='198' fill='url(#goldGradient)' />
            <circle
              cx='200'
              cy='200'
              r='190'
              fill='white'
              stroke='black'
              strokeWidth='2'
            />

            {prizes.map((prize, index) => {
              const angleSize = 360 / prizes.length;
              const startAngle = index * angleSize;
              const endAngle = (index + 1) * angleSize;
              const midAngle = (startAngle + endAngle) / 2;
              const textRadius = 120;
              const textX =
                200 + textRadius * Math.cos((midAngle * Math.PI) / 180);
              const textY =
                200 + textRadius * Math.sin((midAngle * Math.PI) / 180);

              const sectorColor =
                prize === 'KEYINGI SAFAR :)'
                  ? '#FFFFFF'
                  : index % 2 === 0
                  ? '#FFD700'
                  : '#E31E24';

              const textColor =
                prize === 'KEYINGI SAFAR :)'
                  ? '#E31E24'
                  : sectorColor === '#FFFFFF'
                  ? '#000000'
                  : '#FFFFFF';

              return (
                <g key={index}>
                  <path
                    d={createSectorPath(startAngle, endAngle)}
                    fill={sectorColor}
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill={textColor}
                    fontSize='10'
                    fontWeight='bold'
                    textAnchor='middle'
                    dominantBaseline='middle'
                    transform={`rotate(${180 + midAngle} ${textX} ${textY})`}
                  >
                    {prize}
                  </text>
                </g>
              );
            })}

            <circle
              cx='200'
              cy='200'
              r='35'
              fill='url(#centerGradient)'
              stroke='#8B5E23'
              strokeWidth='3'
              filter='url(#shadowFilter)'
            />
            <circle cx='200' cy='200' r='30' fill='#a57f4c' />

            <foreignObject x='165' y='165' width='70' height='70'>
              <img
                src={symbol}
                alt='Symbol'
                onClick={spinWheel}
                className={`w-full h-full rounded-full cursor-pointer ${
                  isSpinning || spinsLeft === 0
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }`}
              />
            </foreignObject>

            <defs>
              <radialGradient
                id='goldGradient'
                gradientUnits='userSpaceOnUse'
                cx='200'
                cy='200'
                r='200'
              >
                <stop offset='0%' stopColor='#FFD700' />
                <stop offset='100%' stopColor='#B8860B' />
              </radialGradient>
              <radialGradient
                id='centerGradient'
                gradientUnits='userSpaceOnUse'
                cx='200'
                cy='200'
                r='35'
              >
                <stop offset='0%' stopColor='#FFE4B5' />
                <stop offset='100%' stopColor='#8B5E23' />
              </radialGradient>
              <filter
                id='shadowFilter'
                x='-50%'
                y='-50%'
                width='200%'
                height='200%'
              >
                <feDropShadow
                  dx='0'
                  dy='2'
                  stdDeviation='3'
                  floodColor='black'
                  floodOpacity='0.5'
                />
              </filter>
            </defs>
          </svg>
        </div>

        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent>
              <DialogHeader>
                <div className='flex justify-center items-center py-4'>
                  <img src={gift} alt='gift' />
                </div>
                <DialogTitle className='flex flex-col justify-center items-center text-center'>
                  {result === 'KEYINGI SAFAR :)' ? (
                    <span className='text-3xl'>Omadingiz Kelmadi!</span>
                  ) : (
                    <span className='text-3xl font-bold'>Tabriklaymiz!!!</span>
                  )}
                </DialogTitle>

                <DialogDescription className='text-center py-10 text-gray-700 text-2xl'>
                  Sizga <strong>{result}</strong> chiqdi!
                  <div className='text-2xl text-center'>
                    {spinsLeft === 0 ? (
                      <span>Barcha urinishlaringiz tugadi!</span>
                    ) : (
                      <span>
                        Sizda yana <strong>{spinsLeft} ta</strong> urinish
                        qoldi!
                      </span>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        <div className='bg-gray-100 p-4 flex justify-center flex-col items-center py-6 rounded-lg text-center shadow-md w-full max-w-sm'>
          <img src={gift2} alt='git' />
          <h3 className='text-2xl font-bold my-2'>Yutuqlaringiz</h3>
          <ol className=' p-4 w-full text-gray-700'>
            {spinsLeft === 3 ? (
              <h3>
                Sizda Hozircha sovg'alar yoq!. Barabanni aylantiring va
                sovg'alarni yuting!
              </h3>
            ) : (
              prizeHistory.map(
                (prize, index) =>
                  prize !== 'KEYINGI SAFAR :)' && (
                    <li className='font-semibold uppercase' key={index}>
                      {prize}
                    </li>
                  )
              )
            )}

            <Dialog open={isModalOpen2} onOpenChange={setIsModalOpen2}>
              <DialogTrigger asChild>
                {spinsLeft === 0 ? (
                  <Button
                    className='bg-green-400 mt-4 text-white h-[45px] hover:bg-green-500 w-full uppercase'
                    variant='outline'
                  >
                    Yutuqni oling!
                  </Button>
                ) : (
                  false
                )}
              </DialogTrigger>

              <DialogContent className='sm:max-w-[425px] text-center'>
                <DialogHeader className='text-center'>
                  <DialogTitle className='text-center text-2xl'>
                    Yutugingizni Oling!
                  </DialogTitle>
                  <DialogDescription className='text-center text-xl text-gray-800'>
                    Malumotlarni toldiring. Bu sizga bog'lanishimiz uchun kerak!
                  </DialogDescription>
                </DialogHeader>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                  <Input
                    id='ism'
                    name='Ism'
                    type='text'
                    required
                    placeholder='Ismingizni kiriting'
                  />
                  <Input
                    id='familiya'
                    name='Familiya'
                    type='text'
                    required
                    placeholder='Familiyangizni kiriting'
                  />
                  <Input
                    id='telefon'
                    name='Telefon'
                    type='text'
                    required
                    placeholder='Telefon raqamingizni kiriting'
                  />
                  <DialogFooter>
                    <Button
                      className='bg-green-400 hover:bg-green-500'
                      type='submit'
                    >
                      Jo‘natish
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default WheelOfFortune;
