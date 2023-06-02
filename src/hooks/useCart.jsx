// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {

    const { user, loading } = useAuth();
    // const token = localStorage.getItem('access-token');

    const [axiosSecure] = useAxiosSecure();


    const { isLoading, refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,

        // Normal api
        // Start
        // queryFn: async () => {
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`,{
        //         headers: {
        //             authorization: `bearer ${token}`
        //         }
        //   End


        // for axiosSecure 
        // start
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`);
            console.log(res)
            return res.data;
        }
        // End


    })

    return [cart, isLoading, refetch];

};

export default useCart;