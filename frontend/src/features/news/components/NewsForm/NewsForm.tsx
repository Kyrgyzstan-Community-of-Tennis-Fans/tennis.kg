import React, { type FormEvent, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import { useAppDispatch } from '@/app/hooks';
import { useNewsForm } from '@/features/news/hooks/useNewsForm';
import { useDialogState } from '@/features/news/hooks/useDialogState';
import { createNews, fetchOneNews, updateNews } from '@/features/news/newsThunks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomEditor from '@/features/news/components/CustomEditor/CustomEditor';
import FileInput from '@/components/FileInput/FilleInput';
import { PencilSquareIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';
import { API_URl } from '@/consts';

interface Props {
  newsId?: string;
  isEdit?: boolean;
}

export const NewsForm: React.FC<Props> = ({ newsId, isEdit = false }) => {
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>(null);
  const { news, setNews, resetKey, handleChange, handleEditorChange, handleFileInputChange, resetForm } = useNewsForm();
  const { open, toggleOpen } = useDialogState();

  useEffect(() => {
    if (open && newsId && isEdit) {
      const newsLoad = async () => {
        const fetchedNews = await dispatch(fetchOneNews(newsId)).unwrap();

        setNews({
          title: fetchedNews.title,
          subtitle: fetchedNews.subtitle,
          content: fetchedNews.content,
          newsCover: fetchedNews.newsCover,
          images: fetchedNews.images,
        });
      };

      void newsLoad();
    }
  }, [newsId, isEdit, dispatch, open, setNews]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { toast } = await import('sonner');

    if (!news.title.trim() || !news.content.trim() || !news.newsCover) {
      return toast.error('Заполните обязательные поля!');
    }

    try {
      if (isEdit && newsId) {
        await dispatch(updateNews({ newsId, newsMutation: news })).unwrap();
        toast.success('Новость успешно обновлена!');
      } else {
        await dispatch(createNews(news)).unwrap();
        toast.success('Новость успешно добавлена!');
      }
      resetForm();
      toggleOpen();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при создании/обновлении новости!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size='lg'>
            <PencilSquareIcon />
          </Button>
        ) : (
          <Button className={'w-full xs:w-max'} size={'sm'}>
            Добавить новость <SquaresPlusIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-h-svh overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {isEdit ? 'Редактировать новость' : 'Добавить новость'}
          </DialogTitle>
          <DialogDescription>Заполните форму перед добавлением</DialogDescription>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleSubmit} key={resetKey}>
          <div className='flex flex-col'>
            <Label htmlFor='title' className='text-lg mb-1'>
              Заголовок новости
            </Label>
            <Input
              required
              name='title'
              placeholder='Заголовок новости'
              autoComplete='off'
              value={news.title}
              onChange={handleChange}
              className='h-12 focus-visible:ring-[#80BC41]'
            />
          </div>

          <div className='flex flex-col'>
            <Input
              name='subtitle'
              placeholder='Подзаголовок новости'
              autoComplete='off'
              value={news.subtitle}
              onChange={handleChange}
              className='h-12 focus-visible:ring-[#80BC41]'
            />
          </div>

          <div className='flex flex-col'>
            <CustomEditor ref={quillRef} value={news.content} onChange={handleEditorChange} />
          </div>

          <div className='flex flex-col'>
            <Label htmlFor='newsCover' className='text-lg'>
              Обложка новости
            </Label>
            <FileInput name='newsCover' onChange={handleFileInputChange} />
            {news.newsCover && (
              <img
                src={
                  news.newsCover instanceof File ? URL.createObjectURL(news.newsCover) : API_URl + '/' + news.newsCover
                }
                alt='News Cover Preview'
                className='mt-2 w-full xs:w-1/2 h-auto'
              />
            )}
          </div>

          <div className='flex flex-col'>
            <Label htmlFor='images' className='text-lg'>
              Изображения новости
            </Label>
            <FileInput name='images' onChange={handleFileInputChange} multiple />
            {news.images.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-2'>
                {news.images.map((image, index) => (
                  <img
                    key={index}
                    src={image instanceof File ? URL.createObjectURL(image) : API_URl + '/' + image}
                    alt={`News Image ${index + 1}`}
                    className='w-full xs:w-1/4 h-auto'
                  />
                ))}
              </div>
            )}
          </div>

          <Button type='submit' className='w-full h-12 bg-[#232A2E] px-10 font-bold'>
            Создать
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
