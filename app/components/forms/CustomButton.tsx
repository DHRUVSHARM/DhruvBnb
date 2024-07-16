
interface CustomButtonProps {
    label: string
    onClick?: () => void
    className?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    className
}) => {
    return (
        <div
            onClick={onClick}
            className={` py-4 bg-airbnb hover:bg-airbnb-dark text-center text-white rounded-xl transition cursor-pointer ${className}`}>
            {label}
        </div>
    )
}

export default CustomButton;