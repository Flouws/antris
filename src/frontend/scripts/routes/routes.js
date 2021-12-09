import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';
import Profile from '../views/pages/profile';
import Error from '../views/pages/error';
import EditProfile from '../views/pages/edit-profile';
import Detail from '../views/pages/detail';

const routes = {
  '/': Login, // default page TODO: Balikin ke login abis selesai develop
  '/login': Login,
  '/register': Register,
  '/dashboard': Dashboard,
  '/profile': Profile,
  // '/edit_profile': EditProfile, // TODO: namanya bener ga? ganti editProfile?
  '/error': Error, // TODO: Connect error to bad routes
  '/detail/:id': Detail,
};

export default routes;
