import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { type FormEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getFooterItems, updateMainPartnerImage } from '@/features/footers/footersThunks';
import { Loader } from '@/components/Loader/Loader';
import { selectItemUpdating } from '@/features/footers/footersSlice';
import { MainPartnerForm } from '@/types/footerTypes';

const MainPartnerEditForm: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const mainPartnerUpdating = useAppSelector(selectItemUpdating);
  const [mainPartner, setMainPartner] = useState<MainPartnerForm>({
    image: null,
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      setMainPartner({
        image: null,
      });
    }
  }, [open]);

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setMainPartner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (mainPartner.image !== null) {
        closeRef.current?.click();
        await dispatch(updateMainPartnerImage({ mainPartnerImageLink: mainPartner.image })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setMainPartner({
          image: null,
        });
        toast.success('Изображение успешно обновлено.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление изображения.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать изображение</DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col justify-between gap-2 mb-3'}>
              <Label htmlFor={'image'}>Изображение партнера</Label>
              <Input id='image' type='file' name='image' onChange={onChangeFileInput} />
            </div>
            <div className={'flex flex-col gap-1'}>
              <Button disabled={mainPartner.image === null} size={'sm'}>
                Сохранить {mainPartnerUpdating && <Loader size={'sm'} theme={'light'} />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MainPartnerEditForm;
