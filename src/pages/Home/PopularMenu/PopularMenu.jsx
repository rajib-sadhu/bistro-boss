
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {

const [menu, loading] = useMenu();

const popular = menu.filter(item=> item.category === 'popular')


    return (
        <section className="mb-12" >

            <SectionTitle
                heading={'From our Menu'}
                subHeading={'Popular Items'}
            />
            {
                loading && <p>Loading...</p>
            }
            <div className="grid md:grid-cols-2 gap-16" >
                {
                    popular.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
            <div className="flex items-center mt-5">
                <button className="btn btn-outline border-0 border-b-4 text-center mx-auto mt-8" >View More Menus</button>
            </div>
        </section>
    );
};

export default PopularMenu;