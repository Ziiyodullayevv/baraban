import logo from '../assets/gorizontal.png';
export default function Header() {
  return (
    <header>
      <div className='container mx-auto px-10'>
        <div className='flex py-4 border-solid border-b-2 border-gray justify-center items-center'>
          <div className='flex gap-3 items-center'>
            <a href='/'>
              <img style={{}} src={logo} className='w-[150px]' alt='logo' />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
