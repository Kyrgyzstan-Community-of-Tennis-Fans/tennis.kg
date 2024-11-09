import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectCreateNewsLoading, selectUpdateNewsLoading } from '@/features/news/newsSlice';
import { NewsMutation } from '@/types/news';

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
  const newsCreating = useAppSelector(selectCreateNewsLoading);
  const newsUpdating = useAppSelector(selectUpdateNewsLoading);

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
    resetForm,
    newsCreating,
    newsUpdating,
  };
};
