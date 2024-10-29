import {Carousel} from '@/types/carousel';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/app/store';
import { deleteImageCarousel, getCarousel, postFetchCarousel } from '@/features/carousel/CarouselThunk';

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
    extraReducers:(builder) => {
        builder.addCase(getCarousel.pending,(state) => {
            state.loadingImgCarousel = true;
            state.errorImgCarousel = false;
        });
        builder.addCase(getCarousel.fulfilled,(state,{payload:img}) => {
            state.loadingImgCarousel = false;
            state.img = img;
        });
        builder.addCase(getCarousel.rejected,(state) => {
            state.loadingImgCarousel = false;
            state.errorImgCarousel = true;
        });


        builder.addCase(postFetchCarousel.pending,(state) => {
            state.loadingImgCarousel = true;
            state.errorImgCarousel = false;
        });
        builder.addCase(postFetchCarousel.fulfilled,(state) => {
            state.loadingImgCarousel = false;
        });
        builder.addCase(postFetchCarousel.rejected,(state) => {
            state.loadingImgCarousel = false;
            state.errorImgCarousel = true;
        });


        builder.addCase(deleteImageCarousel.pending,(state) => {
            state.deleteImgCarousel = true;
            state.errorImgCarousel = false;
        });
        builder.addCase(deleteImageCarousel.fulfilled,(state) => {
            state.deleteImgCarousel = false;
        });
        builder.addCase(deleteImageCarousel.rejected,(state) => {
            state.deleteImgCarousel = false;
            state.errorImgCarousel = true;
        });
    }
});

export const CarouselReducer = CarouselSlice.reducer;
export const photoCarouselState = (state:RootState) => state.carousel.img;
export const loadingCarouselState = (state:RootState) => state.carousel.loadingImgCarousel;
export const deleteCarouselState = (state:RootState) => state.carousel.deleteImgCarousel;