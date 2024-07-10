'use client';
{/* default menu link as part of the dropdown menu .. */ }

interface MenuLinkProps {
    label: string
    onClick?: () => void
}

const MenuLink: React.FC<MenuLinkProps> = ({
    label,
    onClick
}) => {
    return (
        <div
            className="px-5 py-4 cursor-pointer hover:bg-gray-100 transition"
            onClick={onClick}
        >
            {label}
        </div>
    );
};

export default MenuLink;
