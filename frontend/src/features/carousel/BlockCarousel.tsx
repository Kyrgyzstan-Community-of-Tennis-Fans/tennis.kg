import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API_URl } from '@/consts';
import { Loader } from '@/components/Loader/Loader';
import styles from './Carousel.module.css';
import './Carousel.css';
import {useBlockCarousel} from '@/features/carousel/hooks/useBlockCorousel';

export const BlockCarousel = () => {
  
  const { loadingCarousel, displayedPhotos, settings } = useBlockCarousel();

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
          <div className='px-4 lg:px-[50px] mb-5'>
            <Slider {...settings}>
              {displayedPhotos.map((img) => (
                <div key={img._id} className={styles.sliderImage}>
                  <img
                    src={API_URl + '/' + img.image}
                    alt={`${img._id}`}
                    className='w-full h-[244px] sm:h-[400px] md:h-[450px] lg:h-[662px] rounded-lg object-cover'
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </>
  );
};
