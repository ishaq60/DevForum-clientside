import { useQuery } from "@tanstack/react-query";
import UseaxiosPublic from "./UseaxiosPublic";



const UseAlluser = () => {
  const axiosPublic = UseaxiosPublic();

  const { data: alluser = [], refetch, isLoading } = useQuery({
    queryKey: ['alluser'],
    queryFn: async () => {
      const res = await axiosPublic.get('/allUsers');
      console.log(res.data)
      return res.data;
    },
  });

  return [alluser, refetch, isLoading];
};

export default UseAlluser;