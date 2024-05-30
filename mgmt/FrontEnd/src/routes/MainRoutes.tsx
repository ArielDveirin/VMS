import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import SimpleLayout from 'layout/Simple';

// types
import { SimpleLayoutType } from 'types/config';
import PlaySource from 'pages/extra-pages/playSource';
import ManageUsersPage from 'pages/extra-pages/manageUsers';
import SourcePanel from 'pages/extra-pages/manageSources';
import MultiSources from 'pages/extra-pages/multiSourcePlayer';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
// render - sample page
const SourcesPage = Loadable(lazy(() => import('pages/extra-pages/SourcesPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'sources',
          element: <SourcesPage />
        },
        {
          path: 'sources/playsource',
          element: <PlaySource/>
        },
        {
          path: 'manage_users',
          element: <ManageUsersPage/>
        },
        {
          path: 'manage_sources',
          element: <SourcePanel/>
        },
        {
          path: 'multi_source',
          element:<MultiSources/>
        }
      ]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
