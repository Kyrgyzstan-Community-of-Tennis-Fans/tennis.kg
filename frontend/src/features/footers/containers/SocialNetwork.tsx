import { Button } from '@/components/ui/button';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import SocialNetworkCreateForm from '@/features/footers/components/SocialNetworkForms/SocialNetworkCreateForm';
import { useAppSelector } from '@/app/hooks';
import { selectItemsData, selectItemsFetching } from '@/features/footers/footersSlice';
import { SocialNetworkCard } from '@/features/footers/components/Cards/SocialNetworkCard';
import { Loader } from '@/components/Loader/Loader';

const SocialNetwork = () => {
  const socialNetworkData = useAppSelector(selectItemsData);
  const socialNetworkFetching = useAppSelector(selectItemsFetching);

  if (socialNetworkFetching) return <Loader fixed />;

  return (
    <>
      <div className='flex justify-end'>
        <SocialNetworkCreateForm>
          <Button className={'w-full xs:w-max'}>
            Добавить социальную сеть <SquaresPlusIcon />
          </Button>
        </SocialNetworkCreateForm>
      </div>

      {!socialNetworkFetching && socialNetworkData.length > 0 && socialNetworkData[0].socialNetwork.length === 0 ? (
        <small className={'fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-muted-foreground'}>
          Социальные сети не найдены.
          <SocialNetworkCreateForm>
            <button className={'mx-1 underline underline-offset-2 hover:text-black'}>Добавить социальную сеть</button>
          </SocialNetworkCreateForm>
        </small>
      ) : (
        <div className={'flex items-center gap-2 mt-3 flex-wrap'}>
          {socialNetworkData.length > 0 &&
            socialNetworkData[0].socialNetwork.map((item) => <SocialNetworkCard key={item._id} item={item} />)}
        </div>
      )}
    </>
  );
};

export default SocialNetwork;
