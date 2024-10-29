import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosApi} from '@/axiosApi';
import { Carousel, CarouselMutation } from '@/types/carousel';

export const getCarousel = createAsyncThunk<Carousel[]>(
    'carousel/getCarousel',
    async () => {
        const response = await axiosApi.get<Carousel[] | null>('/carousel');
        return response.data;
    }
);

export const postFetchCarousel = createAsyncThunk(
  'carousel/postFetchCarousel',
  async (newImage) => {

    const user = localStorage.getItem('persist:tennis:users');
    const UserJsonParse = JSON.parse(user);
    const token = JSON.parse(UserJsonParse.user);


    const formData = new FormData();
    const keys = Object.keys(newImage) as (keyof CarouselMutation)[];

    keys.forEach(key => {
      const value = newImage[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post<CarouselMutation>('/carousel/admin-post-image-carousel',formData,{
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });

    return response.data
  }
);

export const deleteImageCarousel = createAsyncThunk(
  'carousel/deleteImageCarousel',
  async (id:string)=> {

    const user = localStorage.getItem('persist:tennis:users');
    const UserJsonParse = JSON.parse(user);
    const token = JSON.parse(UserJsonParse.user);

    const response = await axiosApi.delete(`/carousel/admin-delete-image-carousel/${id}`,{
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    })
    return response.data
  }
);