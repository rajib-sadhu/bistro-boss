import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Social from '../Shared/Social/Social';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const [disable, setDisable] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: `<p> Welcome back ${user.displayName} </p>`,
                    // position: 'top-end',
                    icon: 'success'
                });
                navigate(from, {replace:true});
                form.reset();
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;

        if (validateCaptcha(user_captcha_value) == true) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login </title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content md:flex md:flex-row-reverse flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Enter Captcha" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={disable} type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                            <Social/>
                        </div>
                        <p className='text-center my-3 text-lg'>
                            <small> New Here? <Link to='/signup' className='text-blue-700 underline' >Create a New Account</Link></small>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;