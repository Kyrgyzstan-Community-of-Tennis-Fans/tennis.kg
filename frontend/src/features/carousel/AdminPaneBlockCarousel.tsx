import React, { FormEvent, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { CarouselMutation } from '@/types/carousel';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  deleteImageCarousel,
  getCarousel,
  postFetchCarousel,
  updateCarouselImage,
} from '@/features/carousel/CarouselThunk';
import { Button } from '@/components/ui/button';
import {
  deleteCarouselState, errorImgCarouselState,
  loadingCarouselState,
  photoCarouselState,
} from '@/features/carousel/CarouselSlice';
import { API_URl } from '@/consts';
import { selectUser } from '@/features/users/usersSlice';
import { Loader } from '@/components/Loader/Loader';
import { toast } from 'sonner';
import { ArrowPathIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Confirm } from '@/components/Confirm/Confirm';


const emptyState:CarouselMutation = {
  image: null,
}

export const AdminPaneBlockCarousel = () => {
  const user = useAppSelector(selectUser);
  const [newImage, setNewImage] = useState<CarouselMutation>(emptyState);
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(photoCarouselState);
  const loadingCarousel = useAppSelector(loadingCarouselState);
  const loadingDeleteCarousel = useAppSelector(deleteCarouselState);
  const errorImgCarousel = useAppSelector(errorImgCarouselState)


  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setNewImage(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setNewImage(prevState => ({
        ...prevState,
        [name]: null
      }));
    }
  };

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);



  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newImage.image) {
      toast.warning('Изображение обязательно!')
      return;
    }

    try {
      await dispatch(postFetchCarousel(newImage)).unwrap();
      setNewImage(emptyState);
      await dispatch(getCarousel());
      toast.success('Изображение успешно вылажено');
    } catch(error) {
      console.log(error);
    }
  };

  const onDelete = async (id:string) => {
      await dispatch(deleteImageCarousel({id})).unwrap();
      await dispatch(getCarousel()).unwrap();
      toast.success('Изображение успешно удалено');
  };

  const onUpdateImage = async (id:string, event: FormEvent) => {
    try {
      event.preventDefault();
      if (!newImage.image) {
        toast.warning('Изображение обязательно!')
        return;
      }

      await dispatch(updateCarouselImage({id,updatedImage: newImage})).unwrap();
      setNewImage(emptyState);
      await dispatch(getCarousel()).unwrap();
      toast.success('Изображение успешно обновленно');

    } catch (error) {
      if(errorImgCarousel) {
        toast.error('извините что-то пошло не так, попробуйте еще раз');
      }
    }
  };



  return (
    <>
      <div className="px-5 mt-5">

        <div className="flex justify-center flex-col">
          <div className="mb-3 mx-auto text-cr-black text-[24px] font-bold  uppercase px-5 pb-[25px] md:text-[40px] md:pb-[16px]">
            <h3> Панель администратора для слайдера на главной странице </h3>
          </div>

          <div className="flex justify-center">
            <form onSubmit={onSend} className="flex items-center space-x-2">
              <Input className="w-[250px] md:w-full"
                     id="image"
                     type="file"
                     name="image"
                     onChange={fileInputChangeHandler}
              />
              <Button type="submit" className="mt-0">
                <PaperAirplaneIcon/>
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center">
          {loadingCarousel ? (
            <div className="mx-auto">
              <Loader />
            </div>

          ) : (
            carousel.map(image => (
              <div key={image._id} className="m-[10px] relative">
              <img src={API_URl + '/' + image.image} alt={`${image._id}`}
                     className="rounded-lg object-cover w-[300px] h-[200px] md:w-[400px] md:h-[300px]"
                />
                {
                  user && user.role === 'admin' && (
                    loadingDeleteCarousel ? (
                        <Loader />
                      ) : (
                        <div className="top-3 left-6 absolute">
                          <Confirm onOk={() => onDelete(image._id)}>
                            <Button className="me-3" >
                              <TrashIcon/>
                            </Button>
                          </Confirm>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>
                                <ArrowPathIcon/>
                              </Button>
                            </DialogTrigger>


                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Обновить изображение</DialogTitle>
                                <DialogDescription>Заполните форму перед добавлением.</DialogDescription>

                                <form onSubmit={(e) => onUpdateImage(image._id, e)} className="flex items-center space-x-2">
                                  <Input className="w-[250px] md:w-full"
                                         id="image"
                                         type="file"
                                         name="image"
                                         onChange={fileInputChangeHandler}
                                  />
                                  <Button type="submit" className="mt-0">
                                    <PaperAirplaneIcon/>
                                  </Button>
                                </form>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </div>
                    )
                  )
                }
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};
