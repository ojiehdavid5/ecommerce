import { configureStore, createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  keywords: string;
}

const initialState: FilterState = {
  searchQuery: '',
  selectedCategory: '',
  minPrice: undefined,
  maxPrice: undefined,
  keywords: 'laptop, phone, tablet, watch, headphone',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => { state.searchQuery = action.payload; },
    setSelectedCategory: (state, action: PayloadAction<string>) => { state.selectedCategory = action.payload; },
    setMinPrice: (state, action: PayloadAction<number | undefined>) => { state.minPrice = action.payload; },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => { state.maxPrice = action.payload; },
    setKeywords: (state, action: PayloadAction<string>) => { state.keywords = action.payload; },
  },
});

export const { setSearchQuery, setSelectedCategory, setMinPrice, setMaxPrice, setKeywords } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;