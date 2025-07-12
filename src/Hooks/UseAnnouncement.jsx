import { useQuery } from '@tanstack/react-query';
import UseaxiosPublic from './UseaxiosPublic';


const UseAnnouncement = () => {
  const axiosPublic = UseaxiosPublic();

  const { data: announcements = [], refetch, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosPublic.get('/announcement');
  
      return res.data;

    },
  });

  return [announcements, refetch, isLoading];
};

export default UseAnnouncement;