import axios from "axios";

const axiosPublic=axios.create({
    baseURL:"http://localhost:5000",
})



const UseaxiosPublic = () => {
    return axiosPublic
};

export default UseaxiosPublic;