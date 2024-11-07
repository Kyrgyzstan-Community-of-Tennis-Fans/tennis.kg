import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileInput from '@/features/mainRatingMembers/RatingMembersAdmin/components/FileInput/FileInput';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useRatingWomanNew } from '@/features/mainRatingMembers/hooks/useRatingWomanNew';
import { useAdminRatingMembers } from '@/features/mainRatingMembers/hooks/useAdminRatingMembers';

const RatingWomanNew = () => {
  const {
    ratingMemberWomanMutation,
    isCreating,
    open,
    setOpen,
    handleClose,
    handleChange,
    handleChangeSelect,
    fileInputChangeHandler,
    onFormSubmit,
  } = useRatingWomanNew();
  const { placesTop3 } = useAdminRatingMembers();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          Добавить в женский рейтинг <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника женского рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={onFormSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='name'>Имя</Label>
              <Input required id='name' name='name' value={ratingMemberWomanMutation.name} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='place'>Место</Label>
              <Select
                required
                name='place'
                value={ratingMemberWomanMutation.place}
                onValueChange={(value) => handleChangeSelect(value, 'place')}
              >
                <SelectTrigger id='place'>
                  <SelectValue placeholder='Укажите место' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {placesTop3.map((place) => (
                      <SelectItem key={place} value={place}>
                        {place}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='image'>Фото</Label>
              <FileInput name='image' onChange={fileInputChangeHandler} />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Button
              type='submit'
              disabled={
                isCreating || ratingMemberWomanMutation.place === '' || ratingMemberWomanMutation.image === null
              }
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Отмена
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingWomanNew;
