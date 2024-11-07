import { createSlice } from '@reduxjs/toolkit';
import {
  createNews,
  fetchNews,
  fetchNewsByLimit,
  fetchOneNews,
  removeNews,
  updateNews,
} from '@/features/news/newsThunks';
import { News } from '@/types/news';

interface NewsState {
  news: News[];
  newsPages: number;
  oneNews: News | null;
  createNewsLoading: boolean;
  fetchNewsLoading: boolean;
  fetchOneNewsLoading: boolean;
  updateNewsLoading: boolean;
  removeNewsLoading: boolean | string;
}

const initialState: NewsState = {
  news: [],
  newsPages: 0,
  oneNews: null,
  createNewsLoading: false,
  fetchNewsLoading: false,
  fetchOneNewsLoading: false,
  updateNewsLoading: false,
  removeNewsLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNews.pending, (state) => {
        state.createNewsLoading = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.createNewsLoading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.createNewsLoading = false;
      });

    builder
      .addCase(fetchNews.pending, (state) => {
        state.fetchNewsLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        state.news = payload.data;
        state.newsPages = payload.pages;
        state.fetchNewsLoading = false;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.fetchNewsLoading = false;
      });

    builder
      .addCase(fetchNewsByLimit.pending, (state) => {
        state.fetchNewsLoading = true;
      })
      .addCase(fetchNewsByLimit.fulfilled, (state, { payload: response }) => {
        state.news = response.data;
        state.fetchNewsLoading = false;
      })
      .addCase(fetchNewsByLimit.rejected, (state) => {
        state.fetchNewsLoading = false;
      });

    builder
      .addCase(fetchOneNews.pending, (state) => {
        state.fetchOneNewsLoading = true;
      })
      .addCase(fetchOneNews.fulfilled, (state, { payload: oneNews }) => {
        state.oneNews = oneNews;
        state.fetchOneNewsLoading = true;
      })
      .addCase(fetchOneNews.rejected, (state) => {
        state.fetchOneNewsLoading = false;
      });

    builder
      .addCase(updateNews.pending, (state) => {
        state.updateNewsLoading = true;
      })
      .addCase(updateNews.fulfilled, (state) => {
        state.updateNewsLoading = false;
      })
      .addCase(updateNews.rejected, (state) => {
        state.updateNewsLoading = false;
      });

    builder
      .addCase(removeNews.pending, (state, { meta }) => {
        state.removeNewsLoading = meta.arg;
      })
      .addCase(removeNews.fulfilled, (state) => {
        state.removeNewsLoading = false;
      })
      .addCase(removeNews.rejected, (state) => {
        state.removeNewsLoading = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectNewsPagesCount: (state) => state.newsPages,
    selectOneNews: (state) => state.oneNews,
    selectCreateNewsLoading: (state) => state.createNewsLoading,
    selectFetchNewsLoading: (state) => state.fetchNewsLoading,
    selectFetchOneNewsLoading: (state) => state.fetchOneNewsLoading,
    selectUpdateNewsLoading: (state) => state.updateNewsLoading,
    selectRemoveNewsLoading: (state) => state.removeNewsLoading,
  },
});

export const newsReducer = newsSlice.reducer;

export const {
  selectNews,
  selectNewsPagesCount,
  selectOneNews,
  selectCreateNewsLoading,
  selectFetchOneNewsLoading,
  selectFetchNewsLoading,
  selectUpdateNewsLoading,
  selectRemoveNewsLoading,
} = newsSlice.selectors;
