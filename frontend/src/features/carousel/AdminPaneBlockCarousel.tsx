import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Confirm } from '@/components/Confirm/Confirm';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { API_URl } from '@/consts';
import { errorImgCarouselState, loadingCarouselState, photoCarouselState } from '@/features/carousel/CarouselSlice';
import {
  deleteImageCarousel,
  getCarousel,
  postFetchCarousel,
  updateCarouselImage,
} from '@/features/carousel/CarouselThunk';
import { selectUser } from '@/features/users/usersSlice';
import { CarouselMutation } from '@/types/carousel';
import { ArrowPathIcon, PaperAirplaneIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

const emptyState: CarouselMutation = {
  image: null,
};

export const AdminPaneBlockCarousel = () => {
  const user = useAppSelector(selectUser);
  const [newImage, setNewImage] = useState<CarouselMutation>(emptyState);
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(photoCarouselState);
  const loadingCarousel = useAppSelector(loadingCarouselState);
  const errorImgCarousel = useAppSelector(errorImgCarouselState);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (errorImgCarousel) {
      toast.error(errorImgCarousel.error);
    }
  }, [errorImgCarousel]);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    if (files && files.length > 0) {
      setNewImage((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleImageUpload = async () => {
    if (!newImage.image) {
      toast.warning('Изображение обязательно!');
      return;
    }
    try {
      await dispatch(postFetchCarousel(newImage)).unwrap();
      setNewImage(emptyState);
      await dispatch(getCarousel());
      toast.success('Изображение успешно выложено');
    } catch (error) {
      console.error(error);
      toast.error('Не удалось загрузить изображение');
    }
  };

  const onDelete = async (id: string) => {
    try {
      await dispatch(deleteImageCarousel({ id })).unwrap();
      await dispatch(getCarousel());
      toast.success('Изображение успешно удалено');
    } catch (error) {
      console.error(error);
      toast.error('Не удалось удалить изображение');
    }
  };

  const onUpdateImage = async (id: string, event: FormEvent) => {
    event.preventDefault();
    if (!newImage.image) {
      toast.warning('Изображение обязательно!');
      return;
    }
    try {
      await dispatch(updateCarouselImage({ id, updatedImage: newImage })).unwrap();
      setNewImage(emptyState);
      await dispatch(getCarousel());
      toast.success('Изображение успешно обновлено');
    } catch (error) {
      console.error(error);
      toast.error('Не удалось обновить изображение');
    }
  };

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  return (
    <Layout>
      <div className='flex justify-center flex-col'>
        <header className='flex mb-4 xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'>
          <div>
            <h1 className='text-2xl font-medium leading-none'>Карусель</h1>
            <small className='text-muted-foreground text-base'>Управление фотографиями главной карусели</small>
          </div>
          {!newImage.image ? (
            <Button onClick={() => inputRef.current?.click()}>
              Добавить фото
              <PencilSquareIcon />
            </Button>
          ) : (
            <Button onClick={handleImageUpload}>
              Отправить
              <PaperAirplaneIcon />
            </Button>
          )}
        </header>

        <div className='flex justify-center'>
          <Input
            className='hidden'
            ref={inputRef}
            id='image'
            type='file'
            name='image'
            onChange={fileInputChangeHandler}
          />
        </div>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {loadingCarousel ? (
          <div className='mx-auto'>
            <Loader />
          </div>
        ) : (
          carousel.map((image) => (
            <div key={image._id} className='relative'>
              <img
                src={`${API_URl}/${image.image}`}
                alt={`${image._id}`}
                className='rounded-lg object-cover h-full w-full max-h-[300px]'
              />
              {user && user.role === 'admin' && (
                <div className='top-3 left-6 absolute'>
                  <Confirm onOk={() => onDelete(image._id)}>
                    <Button className='me-3'>
                      <TrashIcon />
                    </Button>
                  </Confirm>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <ArrowPathIcon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Обновить изображение</DialogTitle>
                        <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
                        <form onSubmit={(e) => onUpdateImage(image._id, e)} className='flex items-center space-x-2'>
                          <Input
                            className='w-[250px] md:w-full'
                            id='image'
                            type='file'
                            name='image'
                            onChange={fileInputChangeHandler}
                          />
                          <Button type='submit' className='mt-0'>
                            <PaperAirplaneIcon />
                          </Button>
                        </form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};
