import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectCreateNewsLoading,
  selectFetchOneNewsLoading,
  selectOneNews,
  selectUpdateNewsLoading,
} from '@/features/news/newsSlice';
import { NewsMutation } from '@/types/news';
import { fetchOneNews } from '@/features/news/newsThunks';

const initialState: NewsMutation = {
  title: '',
  subtitle: '',
  content: '',
  newsCover: '',
  images: [],
};

export const useNewsForm = () => {
  const [news, setNews] = useState<NewsMutation>(initialState);
  const [resetKey, setResetKey] = useState(0);
  const [lastFetchedNewsId, setLastFetchedNewsId] = useState<string | null>(null);
  const oneNews = useAppSelector(selectOneNews);
  const newsCreating = useAppSelector(selectCreateNewsLoading);
  const oneNewsFetching = useAppSelector(selectFetchOneNewsLoading);
  const newsUpdating = useAppSelector(selectUpdateNewsLoading);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  };

  const handleEditorChange = (content: string) => {
    setNews({ ...news, content });
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    setNews((prevState) => {
      if (name === 'images') {
        const updatedImages = Array.from(files);
        return { ...prevState, [name]: [...prevState.images, ...updatedImages] as File[] };
      } else {
        return { ...prevState, [name]: files[0] as File };
      }
    });
  };

  const handleRemoveMedia = (index?: number) => {
    setNews((prevState) => {
      if (index !== undefined) {
        return {
          ...prevState,
          images: prevState.images.filter((_, i) => i !== index) as File[],
        };
      } else {
        return {
          ...prevState,
          newsCover: '',
        };
      }
    });
  };

  const fetchNewsAndSetData = useCallback(
    (newsId: string) => {
      if (newsId && newsId !== lastFetchedNewsId) {
        dispatch(fetchOneNews(newsId));
        setLastFetchedNewsId(newsId);
      }

      if (oneNews) {
        setNews({
          title: oneNews.title,
          subtitle: oneNews.subtitle,
          content: oneNews.content,
          newsCover: oneNews.newsCover,
          images: oneNews.images,
        });
        setLastFetchedNewsId(oneNews._id);
      }
    },
    [lastFetchedNewsId, dispatch, oneNews, setNews],
  );

  const resetForm = () => {
    setNews({ ...initialState });
    setResetKey((prevKey) => prevKey + 1);
  };

  return {
    news,
    setNews,
    resetKey,
    handleChange,
    handleEditorChange,
    handleFileInputChange,
    handleRemoveMedia,
    fetchNewsAndSetData,
    resetForm,
    newsCreating,
    oneNewsFetching,
    newsUpdating,
  };
};
