/* eslint-disable max-len */
import '../../component/search-bar.js';

const Dashboard = {

  async render() {
    $('nav').html('<nav-bar></nav-bar>');

    return `
    <search-bar></search-bar>
    `;
  },

  async afterRender() {

  },
};

export default Dashboard;
