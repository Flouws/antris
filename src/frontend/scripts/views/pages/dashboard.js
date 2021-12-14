/* eslint-disable max-len */
import '../../component/search-bar.js';

const Dashboard = {

  async render() {
    $('bread-crumb').hide(); // remove pagebar

    const role = sessionStorage.getItem('role');

    if (role === 'user') {
      return `
        <search-bar></search-bar>
      `;
    } else if (role === 'hospital') {
      return `
        <a href="#/profile">To profile</a>
      `;
    }
  },

  async afterRender() {

  },
};

export default Dashboard;
