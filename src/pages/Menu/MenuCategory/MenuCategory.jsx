import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, coverImg, btn }) => {
    return (
        <div className="space-y-20 my-20" >
            {title && <Cover img={coverImg} title={title} />}
            <div className="grid md:grid-cols-2 gap-16" >
                {
                    items.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
            {
                btn || 
                <div>
                    <Link to={`/order/${title}`} className="flex items-center" >
                        <button className="btn btn-outline border-0 border-b-4 text-center mx-auto" >Order Your Favourite Food </button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default MenuCategory;