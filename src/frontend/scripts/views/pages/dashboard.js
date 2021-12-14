/* eslint-disable max-len */
import '../../component/search-bar.js';

const Dashboard = {

  async render() {
    const role = sessionStorage.getItem('role');

    if (role === 'user') {
      return `
        <search-bar></search-bar>
      `;
    } else if (role === 'hospital') {
      return `

      `;
    }
  },

  async afterRender() {

  },
};

export default Dashboard;
