import { useQuery } from '@tanstack/react-query';
import UseaxiosPublic from './UseaxiosPublic';


const UsePost = () => {
  const axiosPublic = UseaxiosPublic();

  const { data: Postdatas = [], refetch, isLoading } = useQuery({
    queryKey: ['Postdatas'],
    queryFn: async () => {
      const res = await axiosPublic.get('/posts');
     
      return res.data;
    },
  });

  return [Postdatas, refetch, isLoading];
};

export default UsePost;