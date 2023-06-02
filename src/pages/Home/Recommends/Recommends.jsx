import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import image from '../../../assets/home/slide5.jpg';
import FoodCard from "../../../components/FoodCard/FoodCard";

const Recommends = () => {
    return (
        <div>
            <SectionTitle
                heading={'Chef Recommends'}
                subHeading={'Should Try'}
            />

            <div className="grid md:grid-cols-3 my-12" >
                {
                    [...Array(3)].map((i) => <FoodCard key={i} image={image} /> )
                }
            </div>

        </div>
    );
};

export default Recommends;