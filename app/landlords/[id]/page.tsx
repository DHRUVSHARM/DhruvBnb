import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

// params is added for dynamic routing ..
const LandlordDetailPage = async ({ params }: { params: { id: string } }) => {
    // get info of landlord  , not necessarily the authed user , as we can view the properties 
    // owned by other landlords as well
    const landlord = await apiService.get(`/api/auth/${params.id}`)
    console.log("*******************************************")
    console.log("the landlord details from backend : ", landlord)
    console.log("*******************************************")


    // the user id of the currently authenticated user , this will help display data conditionally 
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src={landlord.avatar_url}
                            width={200}
                            height={200}
                            alt='landlord profile pic / name'
                            className='rounded-full'
                        >

                        </Image>
                        <h1 className="mt-6 text-2xl">{landlord.name ? landlord.name : 'Landlord'}</h1>

                        {
                            userId != params.id && (
                                <ContactButton></ContactButton>
                            )
                        }


                    </div>

                </aside>
                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 " >
                        <PropertyList
                            landlord_id={params.id}
                        >

                        </PropertyList>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LandlordDetailPage;
