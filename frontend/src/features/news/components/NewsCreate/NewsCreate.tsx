import React, { type FormEvent, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useAppDispatch } from '@/app/hooks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NewsMutation } from '@/types/news';
import CustomEditor from '@/features/news/components/CustomEditor/CustomEditor';
import FileInput from '@/components/FileInput/FilleInput';
import { createNews } from '@/features/news/newsThunks';

const initialState: NewsMutation = {
  title: '',
  subtitle: '',
  content: '',
  newsCover: null,
  images: [],
};

const NewsCreate: React.FC = () => {
  const [news, setNews] = useState<NewsMutation>(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  };

  const handleEditorChange = (content: string) => {
    setNews({ ...news, content });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const { toast } = await import('sonner');
      if (!news.title.trim() || !news.content.trim() || !news.newsCover) {
        return toast.error('Заполните обязательные поля!');
      }

      await dispatch(
        createNews({
          title: news.title,
          subtitle: news.subtitle,
          content: news.content,
          newsCover: news.newsCover,
          images: news.images,
        }),
      ).unwrap();

      setOpen(false);
      toast.success('Новость успешно добавлена!');
    } catch (e) {
      console.error(e);
      const { toast } = await import('sonner');
      toast.error('Ошибка при создании новости!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={'w-full xs:w-max'} size={'sm'}>
          Добавить новость
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-svh overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl text-center font-bold'>Добавить новость</DialogTitle>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <Label htmlFor='title' className='text-lg text-[#80BC41] mb-1'>
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
            <Label htmlFor='newsCover' className='text-lg text-[#80BC41]'>
              Обложка новости
            </Label>
            <FileInput name='newsCover' onChange={handleFileInputChange} />
            {news.newsCover && (
              <img
                src={URL.createObjectURL(news.newsCover)}
                alt='News Cover Preview'
                className='mt-2 w-full xs:w-1/2 h-auto'
              />
            )}
          </div>

          <div className='flex flex-col'>
            <Label htmlFor='images' className='text-lg text-[#80BC41]'>
              Изображения новости
            </Label>
            <FileInput name='images' onChange={handleFileInputChange} multiple />
            {news.images.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-2'>
                {news.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
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

export default NewsCreate;
