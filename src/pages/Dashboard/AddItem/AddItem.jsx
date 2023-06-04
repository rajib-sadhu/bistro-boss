import SectionTitle from "../../../components/SectionTitle/SectionTitle";

// import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [axiosSecure] = useAxiosSecure();

    const onSubmit = data => {

        const formData = new FormData();
        formData.append('image', data.image[0]);

        Swal.fire({
            // icon: 'success',
            imageUrl: 'https://media4.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif?cid=ecf05e47lkefr2ktk7962z6d7wi6o3aqmradxp1zl53k57dj&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Custom image',
            title: 'add item loading...',
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                // console.log('image Res:-',imgResponse)
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, category, recipe } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }
                    console.log(newItem);

                    axiosSecure.post(`/menu`, newItem)
                        .then(data => {
                            console.log('after posting new menu item', data.data);
                            if (data.data.insertedId) {
                                reset();

                                Swal.close();

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Menu added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                        .catch(error => {
                            throw new Error(error.message);
                        })

                }
            })

    };
    console.log(errors);

    return (
        <div className="px-10 mx-auto -mt-12">
            <SectionTitle subHeading="What's new" heading="Add an item" />

            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full" >
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe name*</span>
                        </label>
                        <input type="text" placeholder="Recipe name" className="input input-bordered w-full"
                            {...register("name", { required: true, maxLength: 120 })} />
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Category*</span>

                            </label>
                            <select defaultValue="Pick One" className="select select-bordered"
                                {...register("category", { required: true })}
                            >
                                <option disabled>Pick one</option>
                                <option value="pizza" >Pizza</option>
                                <option value="soup" >Soup</option>
                                <option value="salad" >Salad</option>
                                <option value="drinks" >Drinks</option>
                                <option value="dessert" >Dessert</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" placeholder="Price" className="input input-bordered w-full"
                                {...register("price", { required: true })}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe details*</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-40" placeholder="Recipe Details"
                            {...register("recipe", { required: true })}
                        ></textarea>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Item image*</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                            {...register("image", { required: true })} />
                    </div>
                    <input type="submit" value="Add Item" className="btn btn-sm mt-4 mx-auto text-center" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;