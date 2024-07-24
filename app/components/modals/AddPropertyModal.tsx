'use client';

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import usePropertyModal from "@/app/hooks/usePropertyModal";
import Categories from "../addproperty/Categories";
import SelectCountry, { selectCountryValue } from "../forms/SelectCountry";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { error } from "console";


const AddPropertyModal = () => {

    const router = useRouter()

    const addPropertyModal = usePropertyModal();

    // state to control the property adding step , we start from  1

    const [errors, setErrors] = useState<string[]>([])

    const [currentStep, setCurrentStep] = useState(1);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');

    const [dataPrice, setDataPrice] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');

    const [dataCountry, setDataCountry] = useState<selectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);



    // custom function to set the data
    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage)
        }
    }


    // sending data from process to the backend ..
    const submitForm = async () => {
        console.log("submitting the form ..")

        if (dataTitle && dataDescription && dataPrice && dataCountry && dataImage && dataCategory) {
            const formData = new FormData();
            formData.append('category', dataCategory)
            formData.append('title', dataTitle)
            formData.append('description', dataDescription)
            formData.append('price_per_night', dataPrice)
            formData.append('bedrooms', dataBedrooms)
            formData.append('bathrooms', dataBathrooms)
            formData.append('guests', dataGuests)
            formData.append('country', dataCountry.label)
            formData.append('country_code', dataCountry.value)
            formData.append('image', dataImage)

            // the form data object is used to send data to backend using fetch
            const response = await apiService.post('/api/properties/create/', formData)

            // we will have to format the response , if successful ..
            if (response.success) {
                console.log("success , client component ..")
                router.push('/')
                addPropertyModal.close()
            }
            else {
                console.log('error , client')
                // errors from backend can be displayed in the modal
                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error
                })

                setErrors(tmpErrors)
            }


        }
    }


    const content = (
        <>
            {
                (currentStep === 1 ?
                    (<>
                        <h2 className="mb-6 text-2xl"> Choose Category</h2>

                        <Categories
                            dataCategory={dataCategory}
                            setCategory={(category) => setCategory(category)}
                        >

                        </Categories>

                        <CustomButton
                            label="Next"
                            onClick={() => setCurrentStep(2)}
                        ></CustomButton>


                    </>) : currentStep === 2 ? (
                        <>
                            <h2 className="mb-6 text-2xl"> Describe your place</h2>

                            <div className="pt-3 pb-6 space-y-4 ">

                                <div className="flex flex-col space-y-2">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={dataTitle}
                                        onChange={(e) => setDataTitle(e.target.value)}
                                        className="w-full p-4 border border-gray-600 rounded-xl"
                                    >
                                    </input>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Description</label>
                                    <textarea
                                        value={dataDescription}
                                        onChange={(e) => setDataDescription(e.target.value)}
                                        className="w-full p-4 border border-gray-600 rounded-xl h-[200px]"
                                    >
                                    </textarea>
                                </div>


                            </div>

                            <CustomButton
                                label="Previous"
                                className="mb-2 bg-black hover:bg-gray-800"
                                onClick={() => setCurrentStep(1)}
                            ></CustomButton>

                            <CustomButton
                                label="Next"
                                onClick={() => setCurrentStep(3)}
                            ></CustomButton>

                        </>
                    ) : currentStep == 3 ? (
                        <>
                            <h2 className="mb-6 text-2xl"> Details</h2>

                            <div className="pt-3 pb-6 space-y-4 ">

                                <div className="flex flex-col space-y-2">
                                    <label>Price per night</label>
                                    <input
                                        type="number"
                                        value={dataPrice}
                                        onChange={(e) => setDataPrice(e.target.value)}
                                        className="w-full p-4 border border-gray-600 rounded-xl"
                                    >
                                    </input>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Number of Bedrooms</label>
                                    <input
                                        type="number"
                                        value={dataBedrooms}
                                        onChange={(e) => setDataBedrooms(e.target.value)}
                                        className="w-full p-4 border border-gray-600 rounded-xl"
                                    >
                                    </input>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Number of Bathrooms</label>
                                    <input
                                        type="number"
                                        value={dataBathrooms}
                                        onChange={(e) => setDataBathrooms(e.target.value)}
                                        className="w-full p-4 border border-gray-600 rounded-xl"
                                    >
                                    </input>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Maximum number of Guests</label>
                                    <input
                                        type="number"
                                        value={dataGuests}
                                        onChange={(e) => setDataGuests(e.target.value)}
                                        className="w-full p-4 border border-gray-600 rounded-xl"
                                    >
                                    </input>
                                </div>


                            </div>

                            <CustomButton
                                label="Previous"
                                className="mb-2 bg-black hover:bg-gray-800"
                                onClick={() => setCurrentStep(2)}
                            ></CustomButton>

                            <CustomButton
                                label="Next"
                                onClick={() => setCurrentStep(4)}
                            ></CustomButton>

                        </>
                    ) : currentStep === 4 ? (
                        <>
                            <h2 className="mb-6 text-2xl"> Location </h2>

                            <div className="pt-3 pb-6 space-y-4 ">
                                <SelectCountry
                                    value={dataCountry}
                                    onChange={(value) => setDataCountry(value as selectCountryValue)}
                                >

                                </SelectCountry>
                            </div>

                            <CustomButton
                                label="Previous"
                                className="mb-2 bg-black hover:bg-gray-800"
                                onClick={() => setCurrentStep(3)}
                            ></CustomButton>

                            <CustomButton
                                label="Next"
                                onClick={() => setCurrentStep(5)}
                            ></CustomButton>
                        </>
                    ) : (
                        <>

                            <h2 className="mb-6 text-2xl"> Upload Image of Location... </h2>

                            <div className="pt-3 pb-6 space-y-4 ">
                                <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                                    <input
                                        type="file"
                                        accept="images/*"
                                        onChange={setImage}
                                    >
                                    </input>
                                </div>

                                {dataImage && (
                                    <div className="w-[200px] h-[150px] relative">
                                        <Image
                                            fill
                                            alt="Uploaded Image"
                                            src={URL.createObjectURL(dataImage)}
                                            className="w-full h-full object-cover rounded-xl"

                                        >

                                        </Image>
                                    </div>
                                )}

                            </div>

                            {errors.map((error, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80"
                                    >
                                        {error}

                                    </div>
                                )
                            })}

                            <CustomButton
                                label="Previous"
                                className="mb-2 bg-black hover:bg-gray-800"
                                onClick={() => setCurrentStep(4)}
                            ></CustomButton>

                            <CustomButton
                                label="Submit"
                                onClick={() => submitForm()}
                            ></CustomButton>

                        </>
                    )
                )
            }
        </>
    )

    return (
        <>
            <Modal
                isOpen={addPropertyModal.isOpen}
                close={addPropertyModal.close}
                label="Add A Property ..."
                content={content}
            >

            </Modal>
        </>
    )

};

export default AddPropertyModal;