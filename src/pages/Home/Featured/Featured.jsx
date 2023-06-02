import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import image from '../../../assets/home/featured.jpg';

import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item my-20 bg-fixed" >
            <SectionTitle
                subHeading={'Check It Out'}
                heading={'Featured Item'}
            />

            <div className="md:flex justify-center items-center pb-20 pt-12 px-36 bg-black opacity-70 gap-10" >
                <div className="py-10">
                    <img src={image} alt="" />
                </div>
                <div>
                    <p className="text-xl">April 26, 2023</p>
                    <h4 className="text-2xl" >WHERE CAN I GET SOME?</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <button className="btn btn-outline border-0 border-b-4 text-white border-white mt-8" >Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;