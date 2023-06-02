import FoodCard from "../../../components/FoodCard/FoodCard";

// TODO: implement pagination here on this page
const OrderTab = ({items}) => {
    return (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-6 mt-5'>
            {
                items.map(item => <FoodCard key={item._id} item={item} />)
            }
        </div>
    );
};

export default OrderTab;