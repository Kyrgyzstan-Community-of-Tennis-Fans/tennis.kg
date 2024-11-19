import React from 'react';
import { Layout } from '@/components/Layout';
import { BlockCarousel } from '@/features/carousel/BlockCarousel';
import Partners from '@/features/partners/Partners';
import MainPageRating from '@/features/mainRatingMembers/MainPageRating';
import { NewsMain } from '@/features/news/containers/NewsMain/NewsMain';
import GradientCircle from '@/components/GradientCircle/GradientCircle';
import { GradientCirclesTypes } from '@/types/types';

const gradientCircles: GradientCirclesTypes[] = [
  {
    width: '660px',
    height: '675px',
    top: '150px',
    left: '-150px',
    background: 'linear-gradient(90deg, rgba(79, 173, 13, 0.34) 4.12%, #64b32c 51.53%, rgba(100, 179, 44, 0.26) 100%)',
    opacity: '13%',
  },
  {
    width: '283px',
    height: '283px',
    top: '-90px',
    right: '-90px',
    background: 'linear-gradient(205deg, rgba(151, 239, 59, 0.2) 48.06%, rgba(63, 106, 17, 0) 100%)',
    opacity: '29%',
  },
  {
    width: '660px',
    height: '675px',
    top: '580px',
    right: '-250px',
    background: 'linear-gradient(90deg, rgba(79, 173, 13, 0.34) 4.12%, #64b32c 51.53%, rgba(100, 179, 44, 0.26) 100%)',
    opacity: '13%',
  },
  {
    width: '660px',
    height: '675px',
    top: '1110px',
    left: '-200px',
    background: 'linear-gradient(90deg, rgba(79, 173, 13, 0.34) 4.12%, #64b32c 51.53%, rgba(100, 179, 44, 0.26) 100%)',
    opacity: '13%',
  },
  {
    width: '660px',
    height: '675px',
    top: '1360px',
    right: '-195px',
    background: 'linear-gradient(90deg, rgba(79, 173, 13, 0.34) 4.12%, #64b32c 51.53%, rgba(100, 179, 44, 0.26) 100%)',
    opacity: '13%',
  },
  {
    width: '516px',
    height: '528px',
    top: '2000px',
    left: '-20px',
    background: 'linear-gradient(90deg, rgba(79, 173, 13, 0.34) 4.12%, #64b32c 51.53%, rgba(100, 179, 44, 0.26) 100%)',
    opacity: '13%',
  },
  {
    width: '630px',
    height: '654px',
    bottom: '1700px',
    left: '-100px',
    background: 'linear-gradient(90deg, rgba(79, 173, 13, 0.34) 4.12%, #64b32c 51.53%, rgba(100, 179, 44, 0.26) 100%)',
    opacity: '13%',
  },
  {
    width: '516px',
    height: '528px',
    bottom: '600px',
    right: '-20px',
    background:
      'linear-gradient(90deg, rgba(79, 173, 13, 0.01) 4.12%, rgba(100, 179, 44, 0.68) 51.53%, rgba(100, 179, 44, 0.26) 100%)',
    opacity: '13%',
  },
];

export const Home: React.FC = () => {
  return (
    <>
      {gradientCircles.map((circle, id) => (
        <GradientCircle key={id} {...circle} />
      ))}

      <Layout className='mb-32'>
        <BlockCarousel />
      </Layout>

      <section className='mb-8 lg:mb-28'>
        <Partners />
      </section>

      <Layout>
        <section className='mb-24'>
          <MainPageRating />
        </section>
        <section>
          <NewsMain />
        </section>
      </Layout>
    </>
  );
};
