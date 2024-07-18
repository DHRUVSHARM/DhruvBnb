'use client';
import Modal from "./Modal";

import { useState } from "react";
//remember , next/router does not work
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const LoginModal = () => {

    const router = useRouter()
    const loginModal = useLoginModal()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async () => {
        const form_data = {
            email: email,
            password: password,
        }

        const response = await apiService.post('/api/auth/login/', JSON.stringify(form_data))

        console.log("the response is : ", response)

        if (response.access) {
            // we have the access token after signup,  we need to move to login
            handleLogin(response.user.pk, response.access, response.refresh)

            // if we receive the correct sign up response , we will move ahead and redirect

            setErrors([])

            loginModal.close()
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
            <h2 className="mb-6 text-2xl ">Welcome to DhruvBnb , please log in ..</h2>

            <form
                action={submitLogin}
                className="space-y-4">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your email address"></input>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your password"></input>

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
                        console.log("submitted information for login...")
                        submitLogin()
                    }}
                >

                </CustomButton>
            </form>
        </>
    )

    return (
        <Modal
            label="Log in"
            content={content}
            isOpen={loginModal.isOpen}
            close={loginModal.close}
        >

        </Modal>
    );
};

export default LoginModal;