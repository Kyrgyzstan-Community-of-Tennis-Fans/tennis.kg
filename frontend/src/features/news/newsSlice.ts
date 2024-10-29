import { createSlice } from '@reduxjs/toolkit';
import { News } from '@/types/news';
import { fetchNews } from '@/features/news/newsThunks';

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
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.fetchNewsLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, { payload: news }) => {
      state.news = news;
      state.fetchNewsLoading = false;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.fetchNewsLoading = false;
    });
    // builder.addCase(fetchOneNews.pending, (state) => {
    //   state.fetchOneNewsLoading = true;
    // });
    // builder.addCase(fetchOneNews.fulfilled, (state, action) => {
    //   state.oneNews = action.payload;
    //   state.fetchOneNewsLoading = false;
    // });
    // builder.addCase(fetchOneNews.rejected, (state) => {
    //   state.fetchOneNewsLoading = false;
    // });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectOneNews: (state) => state.oneNews,
    selectFetchNewsLoading: (state) => state.fetchNewsLoading,
    selectFetchOneNewsLoading: (state) => state.fetchOneNewsLoading,
  },
});

export const newsReducer = newsSlice.reducer;

export const { selectNews, selectOneNews, selectFetchOneNewsLoading, selectFetchNewsLoading } = newsSlice.selectors;
