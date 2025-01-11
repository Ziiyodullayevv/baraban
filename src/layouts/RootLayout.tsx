import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Snowfall from '../components/Snow';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Snowfall />
      <main className={'min-h-[calc(100vh-100px)]'}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
