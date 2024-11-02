import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { API_URl } from '@/consts';
import { Loader } from '@/components/Loader/Loader';
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
import {useAdminCarousel} from '@/features/carousel/hooks/useAdminCarousel';

export const AdminPaneBlockCarousel = () => {
  
  const {
    user,
    carousel,
    loadingCarousel,
    loadingDeleteCarousel,
    fileInputChangeHandler,
    onSend,
    onDelete,
    onUpdateImage
  } = useAdminCarousel();
  
  return (
    <>
      <div className='mt-5'>
        <div className='flex justify-center flex-col'>
          <div className='mb-3 mx-auto md:pb-[16px]'>
            <h3 className='text-center text-cr-black text-[24px] font-bold  uppercase px-5 pb-[25px] md:text-[40px]'>
              {' '}
              Админ-панель для главного слайдера{' '}
            </h3>
          </div>

          <div className='flex justify-center'>
            <form onSubmit={onSend} className='flex items-center space-x-2'>
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
          </div>
        </div>

        <div className='mt-5 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
          {loadingCarousel ? (
            <div className='mx-auto'>
              <Loader />
            </div>
          ) : (
            carousel.map((image) => (
              <div key={image._id} className='mt-[10px] mb-[10px] mx-auto lg:mx-[5px]  relative'>
                <img
                  src={API_URl + '/' + image.image}
                  alt={`${image._id}`}
                  className='rounded-lg object-cover w-[300px] h-[200px] md:w-[400px] md:h-[300px]'
                />
                {user &&
                  user.role === 'admin' &&
                  (loadingDeleteCarousel ? (
                    <Loader />
                  ) : (
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
                  ))}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
