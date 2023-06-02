import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';

import menuImage from '../../assets/menu/banner3.jpg';
import dessertImage from '../../assets/menu/dessert-bg.jpeg';
import pizzaImage from '../../assets/menu/pizza-bg.jpg';
import saladImage from '../../assets/menu/salad-bg.jpg';
import soupImage from '../../assets/menu/soup-bg.jpg';


import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';



const Menu = () => {

    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Menu </title>
            </Helmet>

            {/* Main Cover */}
            <Cover img={menuImage} title={'our menu'} banner={true} />

            {/* Offered Menu */}
            <SectionTitle
                heading="Today's Offer"
                subHeading="Don't miss"
            />
            <MenuCategory items={offered} btn />

            {/* Dessert Menu */}
            <MenuCategory items={dessert} title="dessert" coverImg={dessertImage} />

            {/* Pizza Menu */}
            <MenuCategory items={pizza} title="pizza" coverImg={pizzaImage} />

            {/* Salad Menu */}
            <MenuCategory items={salad} title="salad" coverImg={saladImage} />

            {/* Soup Menu */}
            <MenuCategory items={soup} title="soup" coverImg={soupImage} />

        </>
    );
};

export default Menu;