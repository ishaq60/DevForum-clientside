import { useQuery } from '@tanstack/react-query';
import UseaxiosPublic from './UseaxiosPublic';


const  UseTotaldata = () => {
  const axiosPublic = UseaxiosPublic();

  const { data: count = [], refetch, isLoading } = useQuery({
    queryKey: ['count'],
    queryFn: async () => {
      const res = await axiosPublic.get('/postcount');
  
      return res.data;
    },
  });

  return [count, refetch, isLoading];
};

export default UseTotaldata;