import { useQuery } from '@tanstack/react-query';


import UseaxiosPublic from './UseaxiosPublic';
import useAuth from '../Authentication/UseAuth';


const UseUser = () => {
  const axiosPublic = UseaxiosPublic();
const {user}=useAuth()
console.log(user)
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users',user?.email],
      enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
     
      return res.data;
    },
  });

  return [users, refetch, isLoading];
};

export default UseUser;