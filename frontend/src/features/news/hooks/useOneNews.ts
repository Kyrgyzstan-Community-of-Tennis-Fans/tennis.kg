import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNewsByLimit, fetchOneNews } from '@/features/news/newsThunks';
import { selectFetchOneNewsLoading, selectNews, selectOneNews } from '@/features/news/newsSlice';
import useEmblaCarousel from 'embla-carousel-react';
import { useCarouselButtons } from '@/features/news/hooks/useCarouselButtons';

export const useOneNews = () => {
  const { id } = useParams<{ id: string }>();
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: true });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselButtons(emblaApi);
  const [initialIndex, setInitialIndex] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNews(id));
      dispatch(fetchNewsByLimit(4));
    }
  }, [dispatch, id]);

  const oneNews = useAppSelector(selectOneNews);
  const news = useAppSelector(selectNews);
  const oneNewsFetching = useAppSelector(selectFetchOneNewsLoading);

  return {
    emblaRef,
    oneNews,
    news,
    initialIndex,
    setInitialIndex,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    oneNewsFetching,
  };
};
