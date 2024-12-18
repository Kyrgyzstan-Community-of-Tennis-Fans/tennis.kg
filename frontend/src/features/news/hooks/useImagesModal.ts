import { useEffect, useRef, useState } from 'react';
import { CarouselApi } from '@/components/ui/carousel';

export const useImagesModal = (index: number, onClose: () => void) => {
  const carouselApi = useRef<CarouselApi | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (carouselApi.current && isInitialized) {
      carouselApi.current.scrollTo(index);
    }
  }, [index, isInitialized]);

  const handleSetApi = (api: CarouselApi) => {
    carouselApi.current = api;
    setIsInitialized(true);
  };

  const handleClose = () => {
    setIsInitialized(false);
    onClose();
  };

  return { handleSetApi, handleClose };
};
