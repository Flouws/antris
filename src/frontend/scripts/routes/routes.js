import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';
import Profile from '../views/pages/profile';

const routes = {
  '/': Profile, // default page
  '/login': Login,
  '/register': Register,
  '/dashboard': Dashboard,
  '/profile': Profile,
};

export default routes;
