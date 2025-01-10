import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import WheelOfFortune from '../components/WheelSpin';
import Hero from '../components/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <h1>Error Page</h1>,
    children: [
      { index: true, element: <Hero /> },
      {
        path: 'baraban',
        element: <WheelOfFortune />,
      },
    ],
  },
]);
