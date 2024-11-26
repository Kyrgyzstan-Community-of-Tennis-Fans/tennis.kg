import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategory,
  updateCategory,
} from '@/features/category/categoryThunks';
import type { Category } from '@/types/category';
import { createSlice } from '@reduxjs/toolkit';

interface RanksState {
  categories: Category[];
  category: Category | null;
  categoriesFetching: boolean;
  categoryDeleting: string | boolean;
  categoryCreating: boolean;
  categoryUpdating: boolean;
  categoryFetching: boolean;
}

const initialState: RanksState = {
  categories: [],
  category: null,
  categoriesFetching: false,
  categoryDeleting: false,
  categoryCreating: false,
  categoryUpdating: false,
  categoryFetching: true,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: ranks }) => {
        state.categories = ranks;
        state.categoriesFetching = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesFetching = false;
      });

    builder
      .addCase(deleteCategory.pending, (state, { meta }) => {
        state.categoryDeleting = meta.arg;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.categoryDeleting = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.categoryDeleting = false;
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.categoryCreating = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload: category }) => {
        state.categories.push(category);
        state.categoryCreating = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.categoryCreating = false;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.categoryUpdating = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.categoryUpdating = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.categoryUpdating = false;
      });

    builder
      .addCase(fetchCategory.pending, (state) => {
        state.category = null;
        state.categoryFetching = true;
      })
      .addCase(fetchCategory.fulfilled, (state, { payload: category }) => {
        state.category = category;
        state.categoryFetching = false;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.categoryFetching = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectCategory: (state) => state.category,
    selectCategoryFetching: (state) => state.categoryFetching,
    selectCategoriesFetching: (state) => state.categoriesFetching,
    selectCategoryDeleting: (state) => state.categoryDeleting,
    selectCategoryCreating: (state) => state.categoryCreating,
    selectCategoryUpdating: (state) => state.categoryUpdating,
  },
});

export const {
  selectCategories,
  selectCategory,
  selectCategoryFetching,
  selectCategoriesFetching,
  selectCategoryDeleting,
  selectCategoryCreating,
  selectCategoryUpdating,
} = categorySlice.selectors;
