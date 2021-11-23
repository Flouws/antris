import Login from '../views/pages/login';
import Register from '../views/pages/register';

const routes = {
  '/': Login, // default page
  '/login': Login,
  '/register': Register,
};

export default routes;
