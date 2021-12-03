import UrlParser from '../../routes/url-parser';

const Detail = {
  async render() {
    return `
  detail
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log(url);
    // const restaurantData = await RestaurantSource.detailRestaurant(url.id);
  },
};

export default Detail;
