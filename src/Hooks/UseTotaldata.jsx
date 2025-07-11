import { useQuery } from '@tanstack/react-query';
import UseaxiosPublic from './UseaxiosPublic';


const  UseLoaderdata = () => {
  const axiosPublic = UseaxiosPublic();

  const { data: count = [], refetch, isLoading } = useQuery({
    queryKey: ['count'],
    queryFn: async () => {
      const res = await axiosPublic.get('/postcount');
      console.log(res.data)
      return res.data;
    },
  });

  return [count, refetch, isLoading];
};

export default UseLoaderdata;