import React, { type FormEvent, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useAppDispatch } from '@/app/hooks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NewsMutation } from '@/types/news';
import CustomEditor from '@/features/news/components/CustomEditor/CustomEditor';

const NewsCreate: React.FC = () => {
  const [news, setNews] = useState<NewsMutation>({
    title: '',
    subtitle: '',
    content: '',
    newsCover: '',
    images: [],
  });
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  };

  const handleContentChange = (content: string) => {
    setNews({ ...news, content });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(news);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={'w-full xs:w-max'} size={'sm'}>
          Добавить новость
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Добавить новость</DialogTitle>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <Label htmlFor='title' className='text-lg text-[#80BC41] mb-1'>
              Заголовок новости
            </Label>
            <Input
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
            <CustomEditor ref={quillRef} value={news.content} onChange={handleContentChange} />
          </div>

          <Button type='submit' className='w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5'>
            Создать
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsCreate;
