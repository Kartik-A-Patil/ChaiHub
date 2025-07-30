import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async () => {
    const snapshot = await firestore().collection('restaurants').get();
    const restaurants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return restaurants;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default restaurantSlice.reducer;
