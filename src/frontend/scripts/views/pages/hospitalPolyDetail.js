/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';

const HospitalPolyDetail = {
  async render() {
    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    console.log(uuid);

    return `
    tes
    `;
  },

  async afterRender() {

  },
};

export default HospitalPolyDetail;
