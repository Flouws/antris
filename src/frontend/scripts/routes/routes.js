/* eslint-disable max-len */
import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';
import Profile from '../views/pages/profile';
import Error from '../views/pages/error';
import EditHospitalProfile from '../views/pages/edit-hospital-profile';
import Detail from '../views/pages/detail';
import HospitalPolyDetail from '../views/pages/hospitalPolyDetail';
import AppointmentPage from '../views/pages/appointment';

const routes = {
  '/': Login, // default page TODO: Balikin ke login abis selesai develop
  '/login': Login,
  '/register': Register,
  '/dashboard': Dashboard,
  '/profile': Profile,
  '/edit_hospital_profile': EditHospitalProfile, // TODO: namanya bener ga? ganti editProfile?
  '/error': Error, // TODO: Connect error to bad routes
  '/detail/:id': Detail,
  '/hospital/:id': HospitalPolyDetail,
  '/appointment/:id': AppointmentPage,
};

export default routes;
