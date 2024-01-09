import { createAsyncThunk } from '@reduxjs/toolkit';
import { adApi } from '../../api/appApi';

export const getAdsData = createAsyncThunk(
  'ads/getAdsData',
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await adApi.getAds();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const postAdData = createAsyncThunk(
  'ads/postAdData',
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await adApi.postAd(payload);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);