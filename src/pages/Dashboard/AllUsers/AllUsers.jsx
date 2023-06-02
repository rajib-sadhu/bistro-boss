import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        return res.json();
    });

    const handleMakeAdmin = (user)=>{
        fetch(`http://localhost:5000/users/admin/${user._id}`,{
            method:'PATCH'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    icon:'success',
                    title:`${user.name} is Admin Now`,
                    showConfirmButton: false,
                    timer:1500
                })
            }
        })
    }

    const handleDelete = (user) => {
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

                fetch(`http://localhost:5000/users${user._id}`, {
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

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | All Users </title>
            </Helmet>
            <div className="flex justify-evenly uppercase font-semibold mb-5 text-3xl">
                <h3 className="" >Total users: {users.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-start" >Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map((user, index) => <tr
                                    key={user._id}
                                >
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td> {user?.name} </td>
                                    <td> {user?.email}</td>
                                    <td className="text-start">{user?.role === 'admin' ? 
                                    <button className="btn">
                                        admin
                                    </button>
                                    :
                                        <button onClick={()=>handleMakeAdmin(user)} className="btn hover:bg-orange-500 text-xl">
                                            <FaUserShield />
                                        </button>
                                    }</td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn btn-error hover:bg-red-700 text-white"><FaTrash /></button>
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

export default AllUsers;