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
    newImage,
    setAddModalOpen,
    handleImageUpload,
    fileInputChangeHandler,
    onDelete,
    onUpdateImage,
    isAddModalOpen,
    previewUrl
  } = useAdminCarousel();

  return (
    <Layout>
      <div className='flex justify-center flex-col'>
        <header className='flex mb-4 xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'>
          <div>
            <h1 className='text-2xl font-medium leading-none'>Карусель</h1>
            <small className='text-muted-foreground text-base'>Управление фотографиями главной карусели</small>
          </div>
            <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
              <DialogTrigger asChild>
                <Button className={'w-full xs:w-max'}  onClick={() => setAddModalOpen(true)}>
                  Добавить файл
                  <SquaresPlusIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
               <DialogHeader>
                <DialogTitle>Добавить файл</DialogTitle>
                 <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
                  <form onSubmit={(e) =>handleImageUpload(e)} className='flex items-center space-x-2'>
                    <Input
                      className='w-[250px] md:w-full'
                      id='image'
                      type='file'
                      name='image'
                     onChange={fileInputChangeHandler}
                    />
                   <Button type='submit' className='mt-0' data-test-id='add-file-in-carousel'>
                       Добавить файл
                    <PaperAirplaneIcon />
                   </Button>
                  </form>
                   {previewUrl && (
                       <div className='border rounded-lg mt-2 mb-2 p-5 bg-muted'>
                           {newImage.image ? (
                               <img
                                   src={previewUrl}
                                   alt='Preview'
                                   className='w-auto h-40 rounded-lg mx-auto object-contain'
                               />
                           ) : (
                               <video
                                   controls
                                   src={previewUrl}
                                   className='w-auto h-40 rounded-lg mx-auto'
                               />
                           )}
                       </div>
                   )}
              </DialogHeader>
             </DialogContent>
            </Dialog>
        </header>
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
                        <DialogTitle>Обновить файл</DialogTitle>
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
                              Добавить файл
                            <PaperAirplaneIcon />
                          </Button>
                        </form>
                          {previewUrl && (
                              <div className="border rounded-lg mt-2 mb-2 p-5 bg-muted">
                                  {newImage.image ? (
                                      <img
                                          src={previewUrl}
                                          alt="Preview"
                                          className="w-auto h-40 rounded-lg mx-auto object-contain"
                                      />
                                  ) : (
                                      <video
                                          controls
                                          src={previewUrl}
                                          className="w-auto h-40 rounded-lg mx-auto"
                                      />
                                  )}
                              </div>
                          )}
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
