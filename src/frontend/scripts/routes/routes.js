import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';
import Profile from '../views/pages/profile';
import Error from '../views/pages/error';

const routes = {
  '/': Profile, // default page TODO: Balikin ke login abis selesai develop
  '/login': Login,
  '/register': Register,
  '/dashboard': Dashboard,
  '/profile': Profile,
  '/error': Error, // TODO: Connect error to bad routes
};

export default routes;
