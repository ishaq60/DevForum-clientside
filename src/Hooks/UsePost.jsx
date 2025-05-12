import { useQuery } from '@tanstack/react-query';
import UseaxiosPublic from './UseaxiosPublic';


const UsePost = () => {
  const axiosPublic = UseaxiosPublic();

  const { data: Postdata = [], refetch, isLoading } = useQuery({
    queryKey: ['Postdata'],
    queryFn: async () => {
      const res = await axiosPublic.get('/posts');
      console.log(res.data)
      return res.data;
    },
  });

  return [Postdata, refetch, isLoading];
};

export default UsePost;