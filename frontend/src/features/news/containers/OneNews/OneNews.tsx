import React from 'react';
import { API_URl } from '@/consts';
import { useOneNews } from '@/features/news/hooks/useOneNews';
import { Layout } from '@/components/Layout';
import { NextButton, PrevButton } from '@/features/news/components/CustomCarousel/CarouselButtons';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import './oneNews.css';
import '../../components/CustomCarousel/embla.css';

export const OneNews: React.FC = () => {
  const { emblaRef, oneNews, news, prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    useOneNews();

  return (
    <Layout className='py-16'>
      <div className='one-news-title-block'>
        <h1 className='one-news-subtitle'>{oneNews?.subtitle}</h1>
        <h2 className='one-news-title'>{oneNews?.title}</h2>
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
        <div className='one-news-content'>{oneNews?.content}</div>
      </section>
      <section>
        <h3 className='one-news-section-title'>Другие новости</h3>
        <div className='one-news-card-container'>
          {news.map((newsItem) => (
            <NewsCard key={newsItem._id} news={newsItem} />
          ))}
        </div>
      </section>
    </Layout>
  );
};
