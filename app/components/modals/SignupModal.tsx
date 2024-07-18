'use client';
import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => {


    const router = useRouter();
    const signupModal = useSignupModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    // helper function to submit the sign up info,  uses our api service to make a post request
    const submitSignup = async () => {
        console.log("submitted , info ...");
        // so the data is picked up from the state and sent to the endpoint in our backend where we can 
        // verify the form credentials ..
        const data_from_form = {
            email: email,
            password1: password1,
            password2: password2,

        }

        const response = await apiService.post('/api/auth/register/', JSON.stringify(data_from_form))

        if (response.access) {
            // we have the access token after signup,  we need to move to login
            handleLogin(response.user.pk, response.access, response.refresh)

            // if we receive the correct sign up response , we will move ahead and redirect

            setErrors([])

            signupModal.close()
            router.push('/');
        }
        else {
            //console.log(response)
            // we have errors
            const tempErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })

            setErrors(tempErrors);
        }
    }

    const content = (
        <>
            <h2 className="mb-6 text-2xl ">Welcome to DhruvBnb , please sign up..</h2>

            <form
                action={submitSignup}
                className="space-y-4">
                <input onChange={(e) => {
                    //console.log(`clicked ... the event is : ${e.target.value}`)
                    setEmail(e.target.value)
                }} type="email" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your email address"></input>
                <input onChange={(e) => setPassword1(e.target.value)} type="password" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your password"></input>
                <input onChange={(e) => setPassword2(e.target.value)} type="password" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Retype Password"></input>

                {errors.map((error, index) => {
                    return (
                        <div className="p-5 bg-airbnb text-white rounded-xl opacity-80" key={`error_${index}`}>
                            {error}
                        </div>

                    )
                })}

                <CustomButton
                    label="Submit"
                    onClick={() => {
                        submitSignup();
                    }}
                >

                </CustomButton>
            </form>
        </>
    )

    return (
        <Modal
            label="Sign Up"
            content={content}
            isOpen={signupModal.isOpen}
            close={signupModal.close}
        >

        </Modal>
    );
};

export default SignupModal;