'use client';

import usePropertyModal from "@/app/hooks/usePropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface AddPropertyButtonProps {
    userId?: string | null;
}


const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {

    const loginModal = useLoginModal();
    const addPropertyModal = usePropertyModal();

    const show = () => {
        // conditional render of the button
        if (userId) {
            addPropertyModal.open();
        }
        else {
            loginModal.open();
        }

    }

    return (
        <div
            onClick={show}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200">
            Djangobnb your home
        </div>
    );
};

export default AddPropertyButton;