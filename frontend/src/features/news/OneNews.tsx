import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useEmblaCarousel from 'embla-carousel-react';
import { fetchNewsByLimit, fetchOneNews } from '@/features/news/newsThunks';
import { selectNews, selectOneNews } from '@/features/news/newsSlice';
import { API_URl } from '@/consts';
import { NextButton, PrevButton, usePrevNextButtons } from '@/features/news/components/CarouselButtons';
import NewsCard from '@/features/news/components/NewsCard';
import './embla.css';

export const OneNews: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: true });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNews(id));
      dispatch(fetchNewsByLimit(4));
    }
  }, [dispatch, id]);

  const oneNews = useAppSelector(selectOneNews);
  const news = useAppSelector(selectNews);

  return (
    <main className='py-16'>
      <div className='text-center mb-5 sm:mb-12'>
        <h1 className='font-semibold leading-10 text-2xl sm:text-4xl md:text-5xl sm:mb-6'>{oneNews?.subtitle}</h1>
        <h2 className='text-cr-gray-500 text-[20px] sm:text-2xl font-medium uppercase'>{oneNews?.title}</h2>
      </div>

      <section className={oneNews && oneNews.images.length > 0 ? 'embla' : 'hidden'}>
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container'>
            {oneNews?.images?.map((imageUrl, index) => (
              <div className='embla__slide' key={index}>
                <img src={API_URl + '/' + imageUrl} alt={`Slide ${index + 1}`} className='embla__slide__image' />
              </div>
            ))}
          </div>
        </div>
        <div className='embla__controls'>
          <div className='embla__buttons'>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </section>
      <section className='mb-5'>
        <div className='text-lg sm:text-xl leading-6 sm:leading-8 mb-5'>{oneNews?.content}</div>
      </section>
      <section>
        <h3 className='text-2xl text-center sm:text-start sm:text-4xl font-semibold mb-8'>Другие новости</h3>
        <div className='grid gap-5 justify-center items-center sm:grid-cols-2 lg:grid-cols-4'>
          {news.map((newsItem) => (
            <NewsCard key={newsItem._id} news={newsItem} />
          ))}
        </div>
      </section>
    </main>
  );
};
