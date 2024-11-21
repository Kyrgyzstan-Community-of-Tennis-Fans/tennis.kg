import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import React, { FormEvent, useEffect, useState } from 'react';
import { CarouselMutation } from '@/types/carousel';
import { errorImgCarouselState, loadingCarouselState, photoCarouselState } from '@/features/carousel/CarouselSlice';
import {
  deleteImageCarousel,
  getCarousel,
  postFetchCarousel,
  updateCarouselImage,
} from '@/features/carousel/CarouselThunk';
import { toast } from 'sonner';

const emptyState: CarouselMutation = {
  image: null,
  video: null,
};

export const useAdminCarousel = () => {
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
    const { files,  } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type.startsWith('video') ? 'video' : 'image';
      setNewImage((prevState) => ({
        ...prevState,
        [fileType]: file,
      }));
    }
  };

  const handleImageUpload = async () => {
    if (!newImage.image && !newImage.video) {
      toast.warning('Выберите фото или видео!');
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

  return {
    user,
    carousel,
    loadingCarousel,
    inputRef,
    newImage,
    handleImageUpload,
    fileInputChangeHandler,
    onDelete,
    onUpdateImage,
  };
};
