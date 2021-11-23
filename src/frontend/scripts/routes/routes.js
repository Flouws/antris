import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';

const routes = {
  '/': Dashboard, // default page
  '/login': Login,
  '/register': Register,
};

export default routes;
