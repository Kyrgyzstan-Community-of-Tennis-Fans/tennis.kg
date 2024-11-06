import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {loadingCarouselState, photoCarouselState} from '@/features/carousel/CarouselSlice';
import {useEffect} from 'react';
import {getCarousel} from '@/features/carousel/CarouselThunk';

export const useBlockCarousel = () => {
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(photoCarouselState);
  const loadingCarousel = useAppSelector(loadingCarouselState);

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnFocus: false,
    dotsClass: 'slick-dots custom-dots',
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const minimumPhotos = 2;
  const displayedPhotos =
    carousel.length >= minimumPhotos
      ? carousel
      : [...carousel, ...Array(minimumPhotos - carousel.length).fill({ image: 'placeholder.jpg', _id: 'placeholder' })];
  
  return { loadingCarousel, displayedPhotos, settings };
};