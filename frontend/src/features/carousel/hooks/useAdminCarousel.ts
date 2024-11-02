import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {selectUser} from '@/features/users/usersSlice';
import React, {FormEvent, useEffect, useState} from 'react';
import {CarouselMutation} from '@/types/carousel';
import {
  deleteCarouselState,
  errorImgCarouselState,
  loadingCarouselState,
  photoCarouselState
} from '@/features/carousel/CarouselSlice';
import {
  deleteImageCarousel,
  getCarousel,
  postFetchCarousel,
  updateCarouselImage
} from '@/features/carousel/CarouselThunk';
import {toast} from 'sonner';

const emptyState: CarouselMutation = {
  image: null,
};

export const useAdminCarousel = () => {
  const user = useAppSelector(selectUser);
  const [newImage, setNewImage] = useState<CarouselMutation>(emptyState);
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(photoCarouselState);
  const loadingCarousel = useAppSelector(loadingCarouselState);
  const loadingDeleteCarousel = useAppSelector(deleteCarouselState);
  const errorImgCarousel = useAppSelector(errorImgCarouselState);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setNewImage((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setNewImage((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newImage.image) {
      toast.warning('Изображение обязательно!');
      return;
    }

    try {
      await dispatch(postFetchCarousel(newImage)).unwrap();
      setNewImage(emptyState);
      await dispatch(getCarousel());
      toast.success('Изображение успешно вылажено');
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id: string) => {
    await dispatch(deleteImageCarousel({ id })).unwrap();
    await dispatch(getCarousel()).unwrap();
    toast.success('Изображение успешно удалено');
  };

  const onUpdateImage = async (id: string, event: FormEvent) => {
    try {
      event.preventDefault();
      if (!newImage.image) {
        toast.warning('Изображение обязательно!');
        return;
      }

      await dispatch(updateCarouselImage({ id, updatedImage: newImage })).unwrap();
      setNewImage(emptyState);
      await dispatch(getCarousel()).unwrap();
      toast.success('Изображение успешно обновленно');
    } catch (error) {
      if (errorImgCarousel) {
        toast.error('извините что-то пошло не так, попробуйте еще раз');
      }
      console.log(error);
    }
  };

  return {
    user,
    carousel,
    loadingCarousel,
    loadingDeleteCarousel,
    fileInputChangeHandler,
    onSend,
    onDelete,
    onUpdateImage
  };
};