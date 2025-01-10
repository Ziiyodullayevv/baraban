import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
// import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <>
      <Header />

      <main className={'min-h-[calc(100vh-100px)]'}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
