import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const AddItem = () => {
    return (
        <div className="px-5 mx-auto -mt-12">
            <SectionTitle subHeading="What's new" heading="Add an item" />

            <div className="">
                <form className="w-full" >
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe name*</span>
                        </label>
                        <input type="text" placeholder="Recipe name" className="input input-bordered w-full" />
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Category*</span>

                            </label>
                            <select className="select select-bordered">
                                <option disabled selected>Pick one</option>
                                <option>Pizza</option>
                                <option>Soup</option>
                                <option>Salad</option>
                                <option>Drinks</option>
                                <option>Dessert</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe details*</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-40" placeholder="Recipe Details"></textarea>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Item image*</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <input type="submit" value="Add Item" className="btn btn-sm mt-4 mx-auto text-center" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;