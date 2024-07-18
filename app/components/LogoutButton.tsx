'use client';

import { useRouter } from "next/navigation";

// import reset cookie function
import { resetAuthCookies } from "../lib/actions";

import MenuLink from "./Navbar/MenuLink";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const submitLogout = async () => {
        // call to reset cookies 
        await resetAuthCookies();
        router.push('/')
    }

    return (
        <MenuLink
            label="Log out"
            onClick={() => {
                console.log("logging out ...")
                submitLogout();
            }}
        >
        </MenuLink>
    )
}

export default LogoutButton;