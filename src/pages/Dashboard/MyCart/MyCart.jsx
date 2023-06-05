import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";

import { FaTrash } from 'react-icons/fa';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyCart = () => {

    const [cart, ,refetch] = useCart();

    const total = cart.reduce((accu, obj) => accu + obj.price, 0);

    const handleDelete = (item) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        refetch();
                    }
                })
            }
        })
    }

    console.log(cart)

    return (
        <div>
            <Helmet>
                <title>Bristro Boss | My Cart</title>
            </Helmet>
            <div className="flex justify-evenly uppercase font-semibold mb-5 text-3xl">
                <h3 className="" >Total Items: {cart.length}</h3>
                <h3 className="" >Total Price: ${total.toFixed(2)}</h3>
                <Link to={`/dashboard/payment`} ><button className="btn btn-warning btn-sm" >Pay</button></Link>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th className="text-start" >Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart.map((item, index) => <tr
                                    key={item._id}
                                >
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td> {item?.name}</td>
                                    <td className="text-start"> ${item?.price.toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item)} className="btn btn-error hover:bg-red-700 text-white btn-sm"><FaTrash /></button>
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;