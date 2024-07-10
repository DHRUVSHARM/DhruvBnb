'use client';
import Modal from "./Modal";

import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";

const SignupModal = () => {

    const signupModal = useSignupModal()

    const content = (
        <>
            <h2 className="mb-6 text-2xl ">Welcome to DhruvBnb , please sign up..</h2>

            <form className="space-y-4">
                <input type="email" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your email address"></input>
                <input type="password" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your password"></input>
                <input type="password" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Retype Password"></input>


                <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                    The error message
                </div>

                <CustomButton
                    label="Submit"
                    onClick={() => {
                        console.log("submitted information ...")
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