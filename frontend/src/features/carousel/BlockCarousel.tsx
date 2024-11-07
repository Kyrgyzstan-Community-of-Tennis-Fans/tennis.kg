import { API_URl } from '@/consts';
import { Loader } from '@/components/Loader/Loader';
import styles from './Carousel.module.css';
import './Carousel.css';
import {useBlockCarousel} from '@/features/carousel/hooks/useBlockCorousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

export const BlockCarousel = () => {
  const plugin = React.useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  
  const { loadingCarousel, displayedPhotos, } = useBlockCarousel();

  return (
    <>
      <div>
        <div className='mt-[52px] text-center md:mt-[157px]'>
          <h1 className='text-cr-black text-[20px] font-bold uppercase mb-[25px] md:text-[64px] md:mb-[16px]'>
            Кыргызстанское сообщество любителей тенниса
          </h1>
          <p className='hidden text-[#808080] md:block text-[36px] font-medium pb-[56px]'>
            Искусство становиться первым!
          </p>
        </div>

        {loadingCarousel ? (
          <Loader />
        ) : (
          <Carousel  plugins={[plugin.current]}
                     onMouseEnter={plugin.current.stop}
                     onMouseLeave={plugin.current.reset}
                     className='px-4 lg:px-[50px] mb-5'
          >
            <CarouselContent>
              {displayedPhotos.map((img) => (
                <CarouselItem key={img._id} className={styles.sliderImage}>
                  <img
                    src={API_URl + '/' + img.image}
                    alt={`${img._id}`}
                    className='w-full h-[244px] sm:h-[400px] md:h-[450px] lg:h-[662px] rounded-lg object-cover'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </>
  );
};
