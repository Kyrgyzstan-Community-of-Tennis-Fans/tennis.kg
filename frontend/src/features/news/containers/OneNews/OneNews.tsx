import React from 'react';
import DOMPurify from 'dompurify';
import { API_URl } from '@/consts';
import { useOneNews } from '@/features/news/hooks/useOneNews';
import { Layout } from '@/components/Layout';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import { Loader } from '@/components/Loader/Loader';
import { useDialogState } from '@/features/news/hooks/useDialogState';
import { NewsImagesModal } from '@/features/news/components/NewsImagesModal/NewsImagesModal';
import './oneNews.css';
import '../../components/CustomCarousel/embla.css';

export const OneNews: React.FC = () => {
  const { emblaRef, oneNews, initialIndex, setInitialIndex, news, oneNewsFetching } = useOneNews();
  const { open, toggleOpen } = useDialogState();
  const sanitize = (html: string): string => DOMPurify.sanitize(html);

  const handleImageClick = (index: number) => {
    setInitialIndex(index);
    toggleOpen();
  };

  if (oneNewsFetching) return <Loader />;

  return (
    <Layout>
      <div className='one-news-title-block'>
        <h1 className='one-news-title'>{oneNews?.title}</h1>
        <h2 className='one-news-subtitle'>{oneNews?.subtitle}</h2>
      </div>

      <section className={oneNews && oneNews.images.length > 0 ? 'embla' : 'hidden'}>
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container'>
            {oneNews?.images?.map((imageUrl, index) => (
              <div className='embla__slide' key={index} onClick={() => handleImageClick(index)}>
                <img src={API_URl + '/' + imageUrl} alt={`Slide ${index + 1}`} className='embla__slide__image' />
              </div>
            ))}
          </div>
        </div>
      </section>

      {oneNews && oneNews.content && (
        <section className='news-content' dangerouslySetInnerHTML={{ __html: sanitize(oneNews.content) }} />
      )}

      <section>
        <h3 className='one-news-section-title'>Другие новости</h3>
        <div className='one-news-card-container'>
          {news.map((newsItem) => (
            <NewsCard key={newsItem._id} news={newsItem} />
          ))}
        </div>
      </section>

      {oneNews && oneNews.images.length > 0 && (
        <NewsImagesModal images={oneNews.images} open={open} onClose={toggleOpen} initialIndex={initialIndex} />
      )}
    </Layout>
  );
};
