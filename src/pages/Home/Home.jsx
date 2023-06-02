import { Helmet } from 'react-helmet-async';

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import ContactSection from "./ContactSection/ContactSection";
import Featured from "./Featured/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Recommends from "./Recommends/Recommends";
import Testimonial from "./Testimonial/Testimonial";



const Home = () => {



    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home </title>
            </Helmet>

            <Banner />
            <Category />
            <PopularMenu />
            <ContactSection />
            <Recommends />
            <Featured />
            <Testimonial />
        </div>
    );
};

export default Home;