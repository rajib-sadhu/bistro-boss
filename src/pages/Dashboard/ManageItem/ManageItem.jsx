import { FaTrash, FaEdit } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageItem = () => {

    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

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

                axiosSecure.delete(`/menu/${item?._id}`)
                    .then(res => {
                        console.log('deleted res:-', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your menu item has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }


    return (
        <div className="-mt-10">
            <SectionTitle heading="Manage All Items" subHeading="Harry up" />
            <div className="flex justify-evenly uppercase font-semibold mb-5 text-3xl">
                <h3 className="" >Total users: {menu.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Recipe</th>
                                <th>Price</th>
                                <th className="text-start" >Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                menu.map((item, index) => <tr
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
                                    <td> {item?.name} </td>
                                    <td className="text-start" title={item?.recipe}>{item?.recipe.slice(0, 25)}... </td>
                                    <td> ${item?.price}</td>
                                    <td className="text-start">
                                        <button onClick={() => ' handleMakeAdmin(item)'} className="btn hover:bg-orange-500 text-xl">
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item)} className="btn btn-error hover:bg-red-700 text-white"><FaTrash /></button>
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

export default ManageItem;