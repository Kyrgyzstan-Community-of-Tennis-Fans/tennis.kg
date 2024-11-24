import { API_URl } from '@/consts';
import { Loader } from '@/components/Loader/Loader';
import { useBlockCarousel } from '@/features/carousel/hooks/useBlockCorousel';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export const BlockCarousel = () => {
  const { loadingCarousel, carousel } = useBlockCarousel();

  return (
    <>
      <div>
        <div className='text-center'>
          <h1 className='text-[20px] font-bold uppercase mb-[25px] md:text-[64px] md:mb-[16px]'>
            Кыргызстанское сообщество любителей тенниса
          </h1>
          <p className='hidden text-[#808080] md:block text-[36px] font-medium pb-[56px]'>
            Искусство становиться первым!
          </p>
        </div>

        {loadingCarousel ? (
          <Loader />
        ) : (
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className='px-4 lg:px-[50px] mb-5 overflow-hidden'
          >
            <CarouselContent className='rounded-lg'>
              {carousel.map((img) => (
                <CarouselItem key={img._id} className='overflow-hidden rounded-lg'>
                  {img.image ? (
                      <img
                          src={API_URl + '/' + img.image}
                          alt={img._id}
                          className='w-full h-[244px] sm:h-[400px] md:h-[450px] lg:h-[662px] object-cover rounded-lg'
                      />
                  ) : img.video ? (
                      <video
                          controls
                          src={API_URl + '/' + img.video}
                          className='w-full h-[244px] sm:h-[400px] md:h-[450px] lg:h-[662px] object-cover rounded-lg'
                      />
                  ) : null}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </>
  );
};
