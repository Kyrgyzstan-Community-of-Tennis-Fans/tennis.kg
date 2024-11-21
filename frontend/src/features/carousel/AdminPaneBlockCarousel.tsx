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
import { PaperAirplaneIcon, PencilSquareIcon, SquaresPlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAdminCarousel } from '@/features/carousel/hooks/useAdminCarousel';

export const AdminPaneBlockCarousel = () => {
  const {
    user,
    carousel,
    loadingCarousel,
    inputRef,
    newImage,
    handleImageUpload,
    fileInputChangeHandler,
    onDelete,
    onUpdateImage,
  } = useAdminCarousel();

  return (
    <Layout>
      <div className='flex justify-center flex-col'>
        <header className='flex mb-4 xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'>
          <div>
            <h1 className='text-2xl font-medium leading-none'>Карусель</h1>
            <small className='text-muted-foreground text-base'>Управление фотографиями главной карусели</small>
          </div>
          {newImage.image || newImage.video ? (
              <Button onClick={handleImageUpload}>
                Отправить
                <PaperAirplaneIcon />
              </Button>
          ) : (
              <Button onClick={() => inputRef.current?.click()} className={'w-full xs:w-max'}>
                Добавить файл
                <SquaresPlusIcon />
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
              {image.image ? (
                  <img
                      src={API_URl + '/' + image.image}
                      alt={image._id}
                      className='rounded-lg object-cover h-full w-full max-h-[300px]'
                  />
              ) : image.video ? (
                  <video
                      controls
                      src={API_URl + '/' + image.video}
                      className='rounded-lg object-cover h-full w-full max-h-[300px]'
                  />
              ) : null}
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
                        <PencilSquareIcon />
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
