import axios from "axios";

const axiosPublic=axios.create({
    baseURL:"https://devforum-server.vercel.app",
})



const UseaxiosPublic = () => {
    return axiosPublic
};

export default UseaxiosPublic;