import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaShoppingBag, FaBook, FaUsers } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { CgMenuGridR } from "react-icons/cg";
// import { CgMenuLeft } from "react-icons/cg";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {

    const [cart] = useCart();

    // TODO: Load data from the server to have dynamic isAdmin based on user data
    // const isAdmin = true;

    const [isAdmin] = useAdmin();

    return (
        <div className="drawer lg:drawer-mobile">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mt-10">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn drawer-button lg:hidden ">Open</label>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-[#d1a054] ">
                    {/* Sidebar content here */}

                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/home"> <FaHome /> Admin Home </NavLink>  </li>
                                <li><NavLink to="/dashboard/addItem"> <ImSpoonKnife /> Add Items </NavLink>  </li>
                                <li><NavLink to="/dashboard/ManageItems" > <CgMenuGridR /> Manage Items</NavLink> </li>
                                <li><NavLink to="/dashboard/b" > <FaBook /> Manage Bookings</NavLink> </li>
                                <li><NavLink to="/dashboard/allUsers" > <FaUsers /> All Users</NavLink> </li>
                            </>
                            :
                            <>

                                <li><NavLink to="/dashboard/home"> <FaHome /> User Home </NavLink>  </li>
                                <li><NavLink to="/dashboard/history"> <FaWallet /> Payment History </NavLink>  </li>
                                <li><NavLink to="/dashboard/myCart" > <FaShoppingCart /> My Cart
                                    <span className="ms-2 badge">{cart?.length || 0}</span>
                                </NavLink> </li>
                                <li><NavLink to="/dashboard/reservation"> <FaCalendarAlt /> Reservation </NavLink> </li>
                            </>
                    }

                    <div className="divider"></div>

                    <li><NavLink to="/"> <FaHome /> Home </NavLink>  </li>
                    <li><NavLink to="/menu"> <MdOutlineRestaurantMenu /> Menu </NavLink>  </li>
                    <li><NavLink to="/order/salad" > <FaShoppingBag /> Shop</NavLink> </li>
                    {/* <li><NavLink> <FaCalendarAlt /> Reservation </NavLink> </li> */}

                </ul>


            </div>
        </div>
    );
};

export default Dashboard;

        // <div className={`drawer drawer-mobile`}>
        //     <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-content mt-10">
        //         {/* <!-- Page content here --> */}
        //         <label htmlFor="my-drawer-2" className="btn text-2xl drawer-button bg-transparent text-black border-none hover:text-white lg:hidden block">Open</label>
        //         <Outlet />
        //     </div>
        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        //         <ul className="menu p-4 w-80 bg-[#d1a054] ">
        //             {/* <!-- Sidebar content here --> */}

        //             {
        //                 isAdmin ?
        //                     <>
        //                         <li><NavLink to="/dashboard/home"> <FaHome /> Admin Home </NavLink>  </li>
        //                         <li><NavLink to="/dashboard/addItem"> <ImSpoonKnife /> Add Items </NavLink>  </li>
        //                         <li><NavLink to="/dashboard/ManageItems" > <CgMenuGridR /> Manage Items</NavLink> </li>
        //                         <li><NavLink to="/dashboard/b" > <FaBook /> Manage Bookings</NavLink> </li>
        //                         <li><NavLink to="/dashboard/allUsers" > <FaUsers /> All Users</NavLink> </li>
        //                     </>
        //                     :
        //                     <>

        //                         <li><NavLink to="/dashboard/home"> <FaHome /> User Home </NavLink>  </li>
        //                         <li><NavLink to="/dashboard/history"> <FaWallet /> Payment History </NavLink>  </li>
        //                         <li><NavLink to="/dashboard/myCart" > <FaShoppingCart /> My Cart
        //                             <span className="ms-2 badge">{cart?.length || 0}</span>
        //                         </NavLink> </li>
        //                         <li><NavLink to="/dashboard/reservation"> <FaCalendarAlt /> Reservation </NavLink> </li>
        //                     </>
        //             }

        //             <div className="divider"></div>

        //             <li><NavLink to="/"> <FaHome /> Home </NavLink>  </li>
        //             <li><NavLink to="/menu"> <MdOutlineRestaurantMenu /> Menu </NavLink>  </li>
        //             <li><NavLink to="/order/salad" > <FaShoppingBag /> Shop</NavLink> </li>
        //             {/* <li><NavLink> <FaCalendarAlt /> Reservation </NavLink> </li> */}

        //         </ul>
        //     </div>
        // </div>