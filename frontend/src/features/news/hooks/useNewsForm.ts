import { useState } from 'react';
import { NewsMutation } from '@/types/news';

const initialState: NewsMutation = {
  title: '',
  subtitle: '',
  content: '',
  newsCover: null,
  images: [],
};

export const useNewsForm = () => {
  const [news, setNews] = useState<NewsMutation>(initialState);
  const [resetKey, setResetKey] = useState(0);

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
        const updatedImages = [...prevState.images, ...Array.from(files)];
        return { ...prevState, [name]: updatedImages };
      } else {
        return { ...prevState, [name]: files[0] };
      }
    });
  };

  const resetForm = () => {
    setNews({ ...initialState });
    setResetKey((prevKey) => prevKey + 1);
  };

  return {
    news,
    resetKey,
    handleChange,
    handleEditorChange,
    handleFileInputChange,
    resetForm,
  };
};
