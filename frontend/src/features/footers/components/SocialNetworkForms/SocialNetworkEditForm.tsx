import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { type FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { LinkDataMutation } from '@/types/footerTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getFooterItems, getOneSocialNetwork, updateSocialNetwork } from '@/features/footers/footersThunks';
import { Loader } from '@/components/Loader/Loader';
import { selectItemUpdating, selectOneSocialLink } from '@/features/footers/footersSlice';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface Props {
  id: string;
}

const SocialNetworkCreateForm: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const socialOneNetworkData = useAppSelector(selectOneSocialLink);
  const socialNetworkUpdating = useAppSelector(selectItemUpdating);
  const [socialNetwork, setSocialNetwork] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      dispatch(getOneSocialNetwork(id));
    }
  }, [dispatch, id, open]);

  useEffect(() => {
    if (open && socialOneNetworkData) {
      const network = socialOneNetworkData.socialNetwork[0];
      setSocialNetwork((prevState) => ({
        ...prevState,
        name: network.name,
        value: network.value,
      }));
    }
  }, [open, socialOneNetworkData]);

  useEffect(() => {
    if (!open) {
      setSocialNetwork({
        name: '',
        value: '',
      });
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSocialNetwork((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (socialNetwork.name.trim().length !== 0 && socialNetwork.value.trim().length !== 0) {
        closeRef.current?.click();
        await dispatch(updateSocialNetwork({ id, data: socialNetwork })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setSocialNetwork({
          name: '',
          value: '',
        });
        toast.success('Социальная сеть успешно обновлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление социальной сети.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать социальную сеть</DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col justify-between gap-2 mb-3'}>
              <Label htmlFor={'social-network'}>Адрес социальной сети</Label>
              <Input
                name='value'
                value={socialNetwork.value}
                onChange={inputChangeHandler}
                placeholder={'Введите URL социальной сети'}
                id={'social-network'}
              />
            </div>
            <div className={'flex flex-col gap-1'}>
              <Button
                disabled={socialNetwork.name.trim().length === 0 || socialNetwork.value.trim().length === 0}
                size={'sm'}
              >
                Сохранить {socialNetworkUpdating && <Loader size={'sm'} theme={'light'} />}
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

export default SocialNetworkCreateForm;
