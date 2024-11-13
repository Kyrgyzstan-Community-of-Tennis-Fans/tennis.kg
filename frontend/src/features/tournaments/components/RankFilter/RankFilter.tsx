import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { selectSelectedRank, setRank } from '@/features/tournaments/tournamentsSlice';

const RankFilter = () => {
  const dispatch = useAppDispatch();
  const selectedRank = useAppSelector(selectSelectedRank);

  const handleRankChange = (rank: string | undefined) => {
    dispatch(setRank(rank));
  };

  return (
    <Tabs value={selectedRank} onValueChange={handleRankChange}>
      <TabsList className='flex justify-between bg-transparent border-b-2 rounded-none text-black px-0'>
        <TabsTrigger
          value='all'
          className='data-[state=active]:text-[#64B32C] data-[state=active]:border-[#64B32C] data-[state=active]:shadow-none rounded-none border-b-2 border-b-transparent bg-transparent leading-7 hover:bg-transparent hover:text-[#64B32C]'
        >
          Все
        </TabsTrigger>
        <TabsTrigger
          value='male'
          className='data-[state=active]:text-[#64B32C] data-[state=active]:border-[#64B32C] data-[state=active]:shadow-none rounded-none border-b-2 border-b-transparent bg-transparent leading-7 hover:bg-transparent hover:text-[#64B32C]'
        >
          Мужские
        </TabsTrigger>
        <TabsTrigger
          value='female'
          className='data-[state=active]:text-[#64B32C] data-[state=active]:border-[#64B32C] data-[state=active]:shadow-none rounded-none border-b-2 border-b-transparent bg-transparent leading-7 hover:bg-transparent hover:text-[#64B32C]'
        >
          Женские
        </TabsTrigger>
        <TabsTrigger
          value='mixed'
          className='data-[state=active]:text-[#64B32C] data-[state=active]:border-[#64B32C] data-[state=active]:shadow-none rounded-none border-b-2 border-b-transparent bg-transparent leading-7 hover:bg-transparent hover:text-[#64B32C]'
        >
          Микст
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default RankFilter;
