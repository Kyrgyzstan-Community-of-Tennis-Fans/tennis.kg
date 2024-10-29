import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "@/axiosApi";
import {Carousel} from "@/types/carousel";

export const getCarousel = createAsyncThunk<Carousel[]>(
    'carousel/getCarousel',
    async () => {
        const response = await axiosApi.get<Carousel[] | null>('/carousel');
        return response.data
    }
)