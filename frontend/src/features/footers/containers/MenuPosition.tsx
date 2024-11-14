import { useAppSelector } from '@/app/hooks';
import { selectItemsData, selectItemsFetching } from '@/features/footers/footersSlice';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import MenuPositionCreateForm from '@/features/footers/components/MenuPositionForms/MenuPositionCreateForm';
import { MenuPositionCard } from '@/features/footers/components/Cards/MenuPositionCard';

const MenuPosition = () => {
  const menuPositionData = useAppSelector(selectItemsData);
  const menuPositionFetching = useAppSelector(selectItemsFetching);

  if (menuPositionFetching) return <Loader fixed />;

  return (
    <>
      <div className='flex justify-end'>
        <MenuPositionCreateForm>
          <Button className={'w-full xs:w-max'}>
            Добавить пункт в положение
            <SquaresPlusIcon />
          </Button>
        </MenuPositionCreateForm>
      </div>

      {(!menuPositionFetching && menuPositionData.length === 0) ||
      (menuPositionData.length > 0 && menuPositionData[0].menuPosition.length === 0) ? (
        <small className='flex justify-center items-center flex-col mt-[30px]'>
          Пунктов в меню не найдено.
          <MenuPositionCreateForm>
            <button className={'mx-1 underline underline-offset-2 hover:text-black'}>Добавить пункт в меню.</button>
          </MenuPositionCreateForm>
        </small>
      ) : (
        <div className={'flex items-stretch gap-2 mt-3 flex-wrap'}>
          {menuPositionData.length > 0 &&
            menuPositionData[0].menuPosition.map((item) => <MenuPositionCard key={item._id} item={item} />)}
        </div>
      )}
    </>
  );
};

export default MenuPosition;
