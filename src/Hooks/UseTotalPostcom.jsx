import { useQuery } from "@tanstack/react-query";
import UseaxiosPublic from "./UseaxiosPublic";

const UseTotalPostcom = () => {
  const axiosPublic = UseaxiosPublic();

  return useQuery({
    queryKey: ['UseTotalPostcom'],
    queryFn: async () => {
      const res = await axiosPublic.get('/totalspostcomment');
      return res.data;
    },
  });
};
export default UseTotalPostcom