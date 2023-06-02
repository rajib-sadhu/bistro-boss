import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {

    const { user } = useContext(AuthContext);

    const { isLoading, refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json()
        }
    })

    return [cart, isLoading, refetch];

};

export default useCart;