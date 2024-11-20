import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { API_URl } from '@/consts';
import { Button } from '@/components/ui/button';
import { useImagesModal } from '@/features/news/hooks/useImagesModal';
import { XIcon } from 'lucide-react';

interface Props {
  images: string[];
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const NewsImagesModal: React.FC<Props> = ({ images, open, onClose, initialIndex = 0 }) => {
  const { handleClose, handleSetApi } = useImagesModal(initialIndex, onClose);

  return open ? (
    <div className='fixed inset-0 z-40 flex w-full items-center justify-center bg-black bg-opacity-50'>
      <Button
        onClick={handleClose}
        className='absolute z-30 rounded-xl top-3 right-3 bg-transparent border-rose-600 text-rose-600 hover:text-white hover:bg-rose-600 transition duration-300'
        variant='outline'
        size='icon'
      >
        <XIcon />
      </Button>
      <Carousel onClick={(e) => e.stopPropagation()} setApi={handleSetApi}>
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i} className='flex justify-center items-center'>
              <img
                src={API_URl + '/' + img}
                alt={`Image ${i}`}
                className='object-cover min-h-[50svh] sm:min-h-[70svh] xl:min-h-[90svh]'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-1/2 left-10 h-12 w-12 bg-transparent text-white z-10 hover:bg-[#64B32C] hover:text-white hover:border-transparent' />
        <CarouselNext className='absolute top-1/2 right-10 h-12 w-12 bg-transparent text-white z-10 hover:bg-[#64B32C] hover:text-white hover:border-transparent' />
      </Carousel>
    </div>
  ) : null;
};
