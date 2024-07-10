'use client';
import Modal from "./Modal";

import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {

    const loginModal = useLoginModal()

    const content = (
        <>
            <h2 className="mb-6 text-2xl ">Welcome to DhruvBnb , please log in ..</h2>

            <form className="space-y-4">
                <input type="email" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your email address"></input>
                <input type="password" className="w-full h-[54px] border-gray-300 rounded-xl px-4" placeholder="Your password"></input>

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
            label="Log in"
            content={content}
            isOpen={loginModal.isOpen}
            close={loginModal.close}
        >

        </Modal>
    );
};

export default LoginModal;