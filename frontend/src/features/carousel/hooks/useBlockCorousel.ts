import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadingCarouselState, photoCarouselState } from '@/features/carousel/CarouselSlice';
import { useEffect } from 'react';
import { getCarousel } from '@/features/carousel/CarouselThunk';

export const useBlockCarousel = () => {
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(photoCarouselState);
  const loadingCarousel = useAppSelector(loadingCarouselState);

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  return { loadingCarousel, carousel };
};
