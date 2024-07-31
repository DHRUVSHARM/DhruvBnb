'use client';

{/* making this a client component to use on click events ... */ }

import { useEffect, useState } from "react";

import MenuLink from "./MenuLink";
import LogoutButton from "../LogoutButton";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import { useRouter } from "next/navigation";

interface UserNavProps {
    userId?: string | null
}

const UserNav: React.FC<UserNavProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();
    const signupModal = useSignupModal();
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();

    return (
        <p>
            <div className="p-2 relative inline-block border rounded-full">
                <button
                    className="flex items-center"
                    onClick={() => { setIsOpen(!isOpen) }}
                >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">

                        {

                            userId ? (
                                <>

                                    <MenuLink
                                        label="My properties"
                                        onClick={() => {
                                            setIsOpen(false)
                                            router.push('/myproperties')
                                        }}

                                    >

                                    </MenuLink>


                                    <MenuLink
                                        label="My reservations"
                                        onClick={() => {
                                            setIsOpen(false)
                                            router.push('/myreservations')
                                        }}

                                    >

                                    </MenuLink>


                                    <MenuLink
                                        label="My Favorites"
                                        onClick={() => {
                                            setIsOpen(false)
                                            router.push('/myfavorites')
                                        }}

                                    >

                                    </MenuLink>


                                    <MenuLink
                                        label="Inbox"
                                        onClick={() => {
                                            setIsOpen(false)
                                            router.push('/inbox')
                                        }}

                                    >

                                    </MenuLink>




                                    <LogoutButton></LogoutButton>
                                </>

                            ) : (
                                <>
                                    <MenuLink
                                        label='Log In'
                                        onClick={() => {
                                            console.log("clicked menu link for login")
                                            console.log(loginModal);
                                            setIsOpen(false);
                                            loginModal.open()
                                        }}
                                    ></MenuLink>


                                    <MenuLink
                                        label='Sign Up'
                                        onClick={() => {
                                            console.log("clicked menu link for sign up")
                                            console.log();
                                            setIsOpen(false);
                                            signupModal.open()
                                        }}
                                    ></MenuLink>

                                </>

                            )}

                    </div>
                )}

            </div>
        </p>
    );
};

export default UserNav;