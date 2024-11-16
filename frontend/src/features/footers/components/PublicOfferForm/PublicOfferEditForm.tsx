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
import { getFooterItems, updatePublicOffer } from '@/features/footers/footersThunks';
import { Loader } from '@/components/Loader/Loader';
import { selectItemsData, selectItemUpdating } from '@/features/footers/footersSlice';

const PublicOfferEditForm: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const publicOfferData = useAppSelector(selectItemsData);
  const publicOfferUpdating = useAppSelector(selectItemUpdating);
  const [publicOffer, setPublicOffer] = useState<string>('');
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && publicOfferData) {
      setPublicOffer(publicOfferData[0].publicOffer);
    }
  }, [open, publicOfferData]);

  useEffect(() => {
    if (!open) {
      setPublicOffer('');
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicOffer(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (publicOffer.trim().length !== 0) {
        closeRef.current?.click();
        await dispatch(updatePublicOffer({ publicOfferLink: publicOffer })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setPublicOffer('');
        toast.success('Публичная оферта успешно обновлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление публичной оферты.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать публичнуя оферту</DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col justify-between gap-2 mb-3'}>
              <Label htmlFor={'public-offer'}>Ссылка на оферту</Label>
              <Input
                type='url'
                name='publicOffer'
                value={publicOffer}
                onChange={inputChangeHandler}
                placeholder={'Введите URL публичной оферты'}
                id={'public-offer'}
              />
            </div>
            <div className={'flex flex-col gap-1'}>
              <Button disabled={publicOffer.trim().length === 0} size={'sm'}>
                Сохранить {publicOfferUpdating && <Loader size={'sm'} theme={'light'} />}
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

export default PublicOfferEditForm;
