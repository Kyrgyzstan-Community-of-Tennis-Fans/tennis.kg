import { createSlice } from '@reduxjs/toolkit';
import { News } from '@/types/news';

interface NewsState {
  news: News[];
  oneNews: News | null;
  fetchNewsLoading: boolean;
  fetchOneNewsLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  oneNews: null,
  fetchNewsLoading: false,
  fetchOneNewsLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
  selectors: {
    selectNews: (state) => state.news,
    selectOneNews: (state) => state.oneNews,
    selectFetchNewsLoading: (state) => state.fetchNewsLoading,
    selectFetchOneNewsLoading: (state) => state.fetchOneNewsLoading,
  },
});

export const { selectNews, selectOneNews, selectFetchOneNewsLoading, selectFetchNewsLoading } = newsSlice.selectors;
