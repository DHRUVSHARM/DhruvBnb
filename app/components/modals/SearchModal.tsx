'use client';

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal";

import SelectCountry, { selectCountryValue } from "../forms/SelectCountry";
import { useState } from "react";

const SearchModal = () => {
    let content = (
        <>
        </>
    )
    const searchModal = useSearchModal();
    const [country, SelectCountry] = useState<selectCountryValue>();

    const contentLocation = (
        <>
            <h2
                className="mb-6 text-2xl"
            >
                Where do you want to go ?
            </h2>
        </>
    )

    if (searchModal.step == 'location') {
        content = contentLocation;
    }

    return (
        <Modal
            label="Search"
            content={content}
            isOpen={searchModal.isOpen}
            close={searchModal.close}

        >

        </Modal>
    )
}

export default SearchModal;