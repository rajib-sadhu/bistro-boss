
const MenuItem = ({item}) => {

    const {image, name, price, recipe,  } = item;

    return (
        <div className="flex gap-4" >
            <img className="w-[120px] h-[100px] object-cover rounded-e-[200px] rounded-bl-[200px]" src={image} alt="" />
            <div>
                <h1 className="uppercase" >{name}---------</h1>
                <p>{recipe}</p>
            </div>
                <p className="text-yellow-600"> ${price}</p>
        </div>
    );
};

export default MenuItem;