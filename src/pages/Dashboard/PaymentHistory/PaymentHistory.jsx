import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure(`/payments?email=${user?.email}`)
            return res.data;
        }
    })

    const d= new Date();
    console.log(d.toTimeString())

    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Payments history </title>
            </Helmet>
            <div className="flex justify-evenly uppercase font-semibold mb-5 text-3xl">
                <h3 className="" >Total Payments: {payments.length}</h3>
            </div>

            <div>
            <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Price</th>
                                <th className="text-start" >Items</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                payments.map((pay, index) => <tr
                                    key={pay._id}
                                >
                                    <td>{index + 1}</td>
                                    <td> {pay?.email}</td>
                                    <td> {pay?.transactionId}</td>
                                    <td> {pay?.price}</td>
                                    <td> {pay?.quantity}</td>
                                    <td>  <span className="text-sm font-medium text-slate-500">{new Date(pay?.date).toLocaleTimeString()}</span>, {new Date(pay?.date).toDateString()} </td>
                                  
                                </tr>)
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;