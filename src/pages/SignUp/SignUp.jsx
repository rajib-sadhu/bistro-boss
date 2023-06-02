import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import Social from "../Shared/Social/Social";


const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, addNamePhoto } = useContext(AuthContext);

    const navigate = useNavigate();


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                addNamePhoto(loggedUser, data.name, data.photoURL)
                    .then(() => {

                        const saveUser = { name: data.name, email: data.email, photoURL: data.photoURL || 'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png' }

                        fetch(`http://localhost:5000/users`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {

                                if (data.insertedId) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: `Hello ${saveUser.name}`,
                                        text: 'Account create successfully'
                                    });
                                    reset();
                                    navigate("/")
                                }
                            })
                    })
                console.log(loggedUser)
            })
            .catch(error => {
                console.error('Create Account Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="/login" className="text-blue-600 underline" >Go to login</a>'
                })
            })
    }



    return (
        <>
            <Helmet>
                <title>Bistro Boss | Register </title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content md:flex md:flex-row-reverse flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Create Account now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                <label className="label">
                                    <span className="label-text text-red-500">
                                        {errors.name && <span>*Name field is required</span>}
                                    </span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photoURL" {...register("photoURL")} placeholder="photo URL" className="input input-bordered" />
                                {/* <label className="label">
                                    <span className="label-text text-red-500">
                                        {errors.name && <span>*Name field is required</span>}
                                    </span>
                                </label> */}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                <label className="label">
                                    <span className="label-text text-red-500">
                                        {errors.email && <span>*Email field is required</span>}
                                    </span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", { required: true, minLength: 6 })} placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <span className="label-text text-red-500">
                                        {errors.password?.type == 'required' && <span>*Password field is required</span>}
                                        {errors.password?.type == 'minLength' && <span>*Password must be 6 characters.</span>}
                                    </span>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Create Account</button>
                            </div>
                        </form>
                        <div>
                            <Social />
                        </div>
                        <p className="text-center my-3 text-lg">
                            <small> Already have and account? <Link to='/login' className="text-blue-700 underline" >Please sign in</Link></small>
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;