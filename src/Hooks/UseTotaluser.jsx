import { useQuery } from '@tanstack/react-query';
import UseaxiosPublic from './UseaxiosPublic';


const  Usetotaluser = () => {
  const axiosPublic = UseaxiosPublic();

  const { data: totaluser = [], refetch, isLoading } = useQuery({
    queryKey: ['totaluser'],
    queryFn: async () => {
      const res = await axiosPublic.get('/totaluser');
      console.log(res.data)
      return res.data;
    },
  });

  return [totaluser, refetch, isLoading];
};

export default Usetotaluser;