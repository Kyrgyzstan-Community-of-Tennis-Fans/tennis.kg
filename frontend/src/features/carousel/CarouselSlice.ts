import {Carousel} from '@/types/carousel';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/app/store';
import {
    deleteImageCarousel,
    getCarousel,
    postFetchCarousel,
    updateCarouselImage,
} from '@/features/carousel/CarouselThunk';
import type { GlobalError } from '@/types/userTypes';
import { toast } from 'sonner';

export interface carouselState {
    img:Carousel[];
    loadingImgCarousel:boolean;
    deleteImgCarousel:boolean;
    errorImgCarousel:GlobalError | null;
}

export const initialState:carouselState = {
    img:[],
    loadingImgCarousel:false,
    deleteImgCarousel:false,
    errorImgCarousel:null,
};

export const CarouselSlice = createSlice<carouselState>({
    name:'carousel',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getCarousel.pending,(state) => {
            state.loadingImgCarousel = true;
            state.errorImgCarousel = null;
        });
        builder.addCase(getCarousel.fulfilled,(state,{payload:img}) => {
            state.loadingImgCarousel = false;
            state.img = img;
        });
        builder.addCase(getCarousel.rejected,(state) => {
            state.loadingImgCarousel = false;
            state.errorImgCarousel = null;
        });


        builder.addCase(postFetchCarousel.pending,(state) => {
            state.loadingImgCarousel = true;
            state.errorImgCarousel = null;
        });
        builder.addCase(postFetchCarousel.fulfilled,(state) => {
            state.loadingImgCarousel = false;
        });
        builder.addCase(postFetchCarousel.rejected,(state) => {
            state.loadingImgCarousel = false;
            state.errorImgCarousel = null;
        });


        builder.addCase(deleteImageCarousel.pending,(state) => {
            state.deleteImgCarousel = true;
            state.errorImgCarousel = null;
        });
        builder.addCase(deleteImageCarousel.fulfilled,(state) => {
            state.deleteImgCarousel = false;
        });
        builder.addCase(deleteImageCarousel.rejected,(state,{payload:error}) => {
            toast.warning(error?.error)
            state.deleteImgCarousel = false;
            state.errorImgCarousel =  error || null;
        });

        builder.addCase(updateCarouselImage.pending, (state) => {
            state.loadingImgCarousel = true;
            state.errorImgCarousel = null;
        });
        builder.addCase(updateCarouselImage.fulfilled, (state) => {
            state.loadingImgCarousel = false;
        });
        builder.addCase(updateCarouselImage.rejected, (state, { payload: error }) => {
            state.loadingImgCarousel = false;
            state.errorImgCarousel = error || null;
        });
    }
});

export const CarouselReducer = CarouselSlice.reducer;
export const photoCarouselState = (state:RootState) => state.carousel.img;
export const loadingCarouselState = (state:RootState) => state.carousel.loadingImgCarousel;
export const deleteCarouselState = (state:RootState) => state.carousel.deleteImgCarousel;