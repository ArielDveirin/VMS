import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project import
import Loader from 'components/Loader';

// types
import { SimpleLayoutType } from 'types/config';

const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));

// ==============================|| LAYOUT - SIMPLE / LANDING ||============================== //

const SimpleLayout = ({ layout = SimpleLayoutType.SIMPLE }: { layout?: SimpleLayoutType }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Outlet />
      <FooterBlock isFull={layout === SimpleLayoutType.LANDING} />
    </Suspense>
  );
};

export default SimpleLayout;
