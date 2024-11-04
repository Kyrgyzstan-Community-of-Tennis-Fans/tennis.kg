import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNewsByLimit, fetchOneNews } from '@/features/news/newsThunks';
import { selectNews, selectOneNews } from '@/features/news/newsSlice';
import useEmblaCarousel from 'embla-carousel-react';
import { useCarouselButtons } from '@/features/news/hooks/useCarouselButtons';

export const useOneNews = () => {
  const { id } = useParams<{ id: string }>();
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: true });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselButtons(emblaApi);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNews(id));
      dispatch(fetchNewsByLimit(4));
    }
  }, [dispatch, id]);

  const oneNews = useAppSelector(selectOneNews);
  const news = useAppSelector(selectNews);

  return {
    emblaRef,
    oneNews,
    news,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
