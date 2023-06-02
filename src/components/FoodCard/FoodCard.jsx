import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item, image }) => {

    const { user } = useContext(AuthContext);

    const [ , ,refetch] = useCart();

    const navigate = useNavigate();
    const location = useLocation();


    const handleCart = menuItem => {
        if (user) {

            const cartItem = {
                foodId: menuItem._id,
                name: menuItem.name,
                image: menuItem.image,
                price: menuItem.price,
                email: user.email
            };
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.insertedId) {
                        Swal.fire({
                            title: 'Item added to cart',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        refetch(); // refetch cart to update the number of item in cart
                        // refetch() not work properly
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl relative">
            <figure><img className="h-[300px] w-[424px] object-cover" src={image || item?.image} alt="Shoes" /></figure>
            <p className="bg-orange-600 text-white absolute right-0 mr-4 mt-4 px-4 py-2 text-2xl" >${item?.price}</p>

            <div className="card-body space-y-2">
                <h2 className="card-title mx-auto font-bold">{item?.name}</h2>
                <p className=" mx-auto px-5 text-center font-medium" >{item?.recipe}</p>

                <div className="card-actions justify-center">
                    <button onClick={() => handleCart(item)} className="btn border-b-4 border-yellow-500 border-0 text-yellow-600 bg-[#E8E8E8]">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;