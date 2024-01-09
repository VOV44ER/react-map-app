import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAdsData, postAdData } from "../thunks/applicationThunks";

export interface Ad {
  id: any,
  name: string,
  price: number,
  desciption: string,
  image: any,
}

interface AdsState {
    loading: boolean,
    allADS: Ad[],
  }
  
  const initialState: AdsState = {
    loading: false,
    allADS: [],
  }

export const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(getAdsData.pending, (state, action: PayloadAction<any>) => {
        state.loading = true;
      });
      builder.addCase(getAdsData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allADS = action.payload;
      });
      builder.addCase(getAdsData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
      });
      builder.addCase(postAdData.pending, (state, action: PayloadAction<any>) => {
        state.loading = true;
      });
      builder.addCase(postAdData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allADS = [...state.allADS, action.payload];
      });
      builder.addCase(postAdData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
      });
    }
  });
  
  export default adsSlice.reducer