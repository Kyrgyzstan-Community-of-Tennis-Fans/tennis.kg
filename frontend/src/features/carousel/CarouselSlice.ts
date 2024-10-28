import {Carousel} from '@/types/carousel';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/app/store';

export interface carouselState {
    img:Carousel[];
    loadingImgCarousel:boolean;
    deleteImgCarousel:boolean;
    errorImgCarousel:boolean;
}

export const initialState:carouselState = {
    img:[],
    loadingImgCarousel:false,
    deleteImgCarousel:false,
    errorImgCarousel:false,
};

export const CarouselSlice = createSlice<carouselState>({
    name:'carousel',
    initialState,
    reducers:{},
    extraReducers:(builder) => {}
});

export const CarouselReducer = CarouselSlice.reducer;
export const photoCarouselState = (state:RootState) => state.carousel.img;
export const loadingCarouselState = (state:RootState) => state.carousel.loadingImgCarousel;
export const deleteCarouselState = (state:RootState) => state.carousel.deleteImgCarousel;