import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { Carousel, CarouselMutation } from '@/types/carousel';
import { isAxiosError } from 'axios';
import type { GlobalError } from '@/types/userTypes';

export const getCarousel = createAsyncThunk<Carousel[]>('carousel/getCarousel', async () => {
  const response = await axiosApi.get<Carousel[] | []>('/carousel');
  return response.data;
});

export const postFetchCarousel = createAsyncThunk('carousel/postFetchCarousel', async (newImage: CarouselMutation) => {
  const formData = new FormData();

  if (newImage.image) {
    formData.append('file', newImage.image);
  }
  if (newImage.video) {
    formData.append('file', newImage.video);
  }

  const response = await axiosApi.post<CarouselMutation>('/carousel/admin-post-image-carousel', formData);
  return response.data;
});

export const deleteImageCarousel = createAsyncThunk<void, { id: string }, { rejectValue: GlobalError }>(
  'carousel/deleteImageCarousel',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/carousel/admin-delete-image-carousel/${id}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const updateCarouselImage = createAsyncThunk<
  Carousel,
  { id: string; updatedImage: CarouselMutation },
  { rejectValue: GlobalError }
>('carousel/updateCarouselImage', async ({ id, updatedImage }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(updatedImage) as (keyof CarouselMutation)[];

    keys.forEach((key) => {
      const value = updatedImage[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.put<Carousel>(`/carousel/admin-update-image-carousel/${id}`, formData);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
