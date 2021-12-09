/* eslint-disable max-len */
import '../../component/search-bar.js';

const Dashboard = {
  // <search-bar></search-bar>
  async render() {
    $('nav').html('<nav-bar></nav-bar>'); // remove navbar

    return `
    `;
  },

  async afterRender() {
    $('search-bar').show();
  },
};

export default Dashboard;
