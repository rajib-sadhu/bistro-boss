import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { FacebookAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

const Social = () => {

    const { signInWithGoogle, signInWithFacebook } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogle = () => {


        signInWithGoogle()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);

                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL }

                fetch(`http://localhost:5000/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: `Hello ${saveUser.name}`,
                                text: 'Account create successfully'
                            });
                            navigate(from, { replace: true });
                        }
                        else if (data.message == 'User already exists') {
                            Swal.fire({
                                icon: 'success',
                                title: `Hello ${saveUser.name}`,
                                text: 'Account login successfully'
                            });
                            navigate(from, { replace: true });
                        }
                    })
            })
            .catch(err => console.log(err))


    }

    const handleFacebook = () => {
        signInWithFacebook()
            .then(result => {
                const user = result.user;
                console.log("facebook login:", user);

                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log('facebook token:', accessToken)

                navigate(from, { replace: true });
            })
            .catch(err => console.error(err));
    }



    return (
        <div>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>
                <p className='text-center mb-2' >Sign in with</p>
                <div className="py-3 flex justify-center gap-5 text-3xl bg-base-300">
                    <button onClick={handleGoogle} title='Google' className='hover:opacity-70 duration-200' >
                        <FcGoogle />
                    </button>
                    <button onClick={handleFacebook} title='Facebook' className='text-sky-800 hover:opacity-70 duration-200'>
                        <FaFacebook />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Social;