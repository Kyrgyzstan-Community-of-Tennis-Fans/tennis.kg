import { createSlice } from '@reduxjs/toolkit';
import { fetchNews, fetchNewsByLimit, fetchOneNews } from '@/features/news/newsThunks';
import { News } from '@/types/news';

interface NewsState {
  news: News[];
  newsPages: number;
  oneNews: News | null;
  fetchNewsLoading: boolean;
  fetchOneNewsLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  newsPages: 0,
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
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload.data;
      state.newsPages = action.payload.pages;
      state.fetchNewsLoading = false;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.fetchNewsLoading = false;
    });

    builder.addCase(fetchNewsByLimit.pending, (state) => {
      state.fetchNewsLoading = true;
    });
    builder.addCase(fetchNewsByLimit.fulfilled, (state, { payload: response }) => {
      state.news = response.data;
      state.fetchNewsLoading = false;
    });
    builder.addCase(fetchNewsByLimit.rejected, (state) => {
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
    selectNewsPagesCount: (state) => state.newsPages,
    selectOneNews: (state) => state.oneNews,
    selectFetchNewsLoading: (state) => state.fetchNewsLoading,
    selectFetchOneNewsLoading: (state) => state.fetchOneNewsLoading,
  },
});

export const newsReducer = newsSlice.reducer;

export const { selectNews, selectNewsPagesCount, selectOneNews, selectFetchOneNewsLoading, selectFetchNewsLoading } =
  newsSlice.selectors;
