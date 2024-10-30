import { createSlice } from '@reduxjs/toolkit';
import { fetchNews, fetchOneNews } from '@/features/news/newsThunks';
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

    builder.addCase(fetchOneNews.pending, (state) => {
      state.fetchOneNewsLoading = true;
    });
    builder.addCase(fetchOneNews.fulfilled, (state, { payload: oneNews }) => {
      state.oneNews = oneNews;
      state.fetchOneNewsLoading = false;
    });
    builder.addCase(fetchOneNews.rejected, (state) => {
      state.fetchOneNewsLoading = false;
    });
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
