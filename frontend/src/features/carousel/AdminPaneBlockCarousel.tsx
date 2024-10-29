import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { CarouselMutation } from '@/types/carousel';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteImageCarousel, getCarousel, postFetchCarousel } from '@/features/carousel/CarouselThunk';
import { Button } from '@/components/ui/button';
import { deleteCarouselState, loadingCarouselState, photoCarouselState } from '@/features/carousel/CarouselSlice';
import { API_URl } from '@/consts';
import { selectUser } from '@/features/users/usersSlice';
import { Loader } from '@/components/Loader/Loader';


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
      alert('image is required');
      return;
    }

    try {
      await dispatch(postFetchCarousel(newImage)).unwrap();
      setNewImage(emptyState);
      await dispatch(getCarousel());
    } catch(error) {
      console.log(error);
    }
  };

  const onDelete = async (id:string) => {
    await dispatch(deleteImageCarousel(id));
    await dispatch(getCarousel());
  };



  return (
    <>
      <div className="px-5 mt-5">

        <div className="flex justify-center flex-col">
          <div className="mb-3 mx-auto text-cr-black text-[24px] font-bold  uppercase px-5 pb-[25px] md:text-[40px] md:pb-[16px]">
            <h3> Admin panel for slider in the main page </h3>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap mt-5">
          {loadingCarousel ? (
            <div className="mx-auto">
              <Loader />
            </div>

          ) : (
            carousel.map(image => (
              <div key={image._id} className="p-2 mx-auto flex items-center flex-col">
              <img src={API_URl + '/' + image.image} alt={`${image._id}`}
                     className="w-[200px] h-[200px] rounded-lg object-cover"
                />
                {
                  user && user.role === 'admin' && (
                    loadingDeleteCarousel ? (
                        <Loader />
                      ) : (
                        <Button className="mt-[5px]" onClick={() => onDelete(image._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                               stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </Button>
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
