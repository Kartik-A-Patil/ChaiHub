import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCartItems as getCartItemsFromDB,
  addToCart as addToCartDB,
  removeFromCart as removeFromCartDB,
  clearCart as clearCartDB,
  initCartTable,
} from '../services/sqliteCart';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  sweetness?: string;
  milk?: string;
  sugar?: string;
  spices?: {
    Ginger?: string;
    Elaichi?: string;
  };
  strength?: string;
  addons?: string[];
}

interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
};

// Thunks for async SQLite operations
export const loadCart = createAsyncThunk('cart/loadCart', async () => {
  await initCartTable();
  const items = await getCartItemsFromDB();
  return items as CartItem[];
});

export const addItemAsync = createAsyncThunk('cart/addItemAsync', async (item: CartItem) => {
  await addToCartDB(item);
  return item;
});

export const removeItemAsync = createAsyncThunk('cart/removeItemAsync', async (id: string) => {
  await removeFromCartDB(id);
  return id;
});

export const clearCartAsync = createAsyncThunk('cart/clearCartAsync', async () => {
  await clearCartDB();
  return;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        const item = state.items.find(i => i.id === action.payload.id);
        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
