import axiosInstance from './axiosHelper';

export const adApi = {
  postAd(body) {
    return axiosInstance.post('api/save_data', body);
  },
  getAds() {
    return axiosInstance.get('api/get_data');
  },
};