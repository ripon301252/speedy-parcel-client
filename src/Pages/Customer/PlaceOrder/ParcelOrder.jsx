import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useAuth } from '../../../Hooks/useAuth';


const ParcelOrder = () => {
    const { register, handleSubmit, watch,
        // formState: { errors } 
    } = useForm();
    const { user } = useAuth();
    const axiosHook = useAxiosSecure();
    const serviceCenter = useLoaderData();
    const regionsDuplicate = serviceCenter.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = watch("senderRegion");
    const senderDistrict = watch("senderDistrict");
    const receiverRegion = watch("receiverRegion");
    const receiverDistrict = watch("receiverDistrict");


    const districtsByRegion = region => {
        const regionDistricts = serviceCenter.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district)
        return districts;
    }

    const areaByDistrict = (region, district) => {
        const matched = serviceCenter.find(
            c => c.region === region && c.district === district
        );
        return matched ? matched.covered_area : [];
    };

    const senderAreas = areaByDistrict(senderRegion, senderDistrict);
    const receiverAreas = areaByDistrict(receiverRegion, receiverDistrict);



    const handleParcelOrder = (data) => {
        console.log(data)
        const parcelWeight = parseFloat(data.parcelWeight);
        const isDocument = data.parcelType === "document";
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const isSameArea = data.senderArea === data.receiverArea;

        let cost = 0;

        if (!isDocument && (!parcelWeight || parcelWeight <= 0)) {
            Swal.fire("Error", "Please enter valid weight", "error");
            return;
        }

        if (isDocument) {
            // Document parcel
            cost = isSameArea ? 40 : isSameDistrict ? 60 : 100; // 80 + 20 for different district
        } else {
            // Non-document parcel
            if (parcelWeight <= 3) {
                cost = isSameArea ? 70 : isSameDistrict ? 110 : 190; // 150 + 40 surcharge
            } else {
                const extraWeight = parcelWeight - 3;
                if (isSameArea) {
                    cost = 70 + extraWeight * 40;
                } else if (isSameDistrict) {
                    cost = 110 + extraWeight * 40;
                } else {
                    cost = 150 + extraWeight * 40 + 40; // surcharge
                }
            }
        }
        // =============================================================================
        // if (isDocument) {
        //     if (isSameDistrict) {
        //         cost = isSameArea ? 40 : 60;
        //     } else {
        //         cost = 80 + 20;
        //     }
        // } else {
        //     if (parcelWeight <= 3) {
        //         if (isSameDistrict) {
        //             cost = isSameArea ? 70 : 110;
        //         } else {
        //             cost = 150 + 40; // surcharge added
        //         }
        //     } else {
        //         const extraWeight = parcelWeight - 3;

        //         if (isSameDistrict) {
        //             const minCharge = isSameArea ? 70 : 110;
        //             cost = minCharge + extraWeight * 40;
        //         } else {
        //             cost = 150 + extraWeight * 40 + 40;
        //         }
        //     }
        // }
        // ===================================================================================
        // if (isDocument) {
        //     if (isSameArea) {
        //         cost = 40;
        //     } else if (isSameDistrict) {
        //         cost = 60;
        //     } else {
        //         cost = 80 + 20;
        //     }
        // } else {
        //     if (parcelWeight <= 3) {
        //         if (isSameArea) {
        //             cost = 70;
        //         } else if (isSameDistrict) {
        //             cost = 110;
        //         } else {
        //             cost = 150 + 40;
        //         }
        //     } else {
        //         const extraWeight = parcelWeight - 3;

        //         if (isSameArea) {
        //             cost = 70 + extraWeight * 40;
        //         } else if (isSameDistrict) {
        //             cost = 110 + extraWeight * 40;
        //         } else {
        //             cost = 150 + extraWeight * 40 + 40;
        //         }
        //     }
        // }

        console.log("cost", cost)

        Swal.fire({
            title: "Agree with the cost",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Take it!"
        }).then((result) => {
            if (result.isConfirmed)
                // save order to database
                axiosHook.post('/parcels', data).then(res => {
                    console.log("after saving data", res.data)
                })


            //     Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            // });
        });
    }


    return (
        <div className='py-20 bg-gray-500'>
            <h1 className='text-5xl font-bold ml-8 '>Send A Parcel</h1>
            <p className='my-5 ml-8'>Enter your parcel details</p>
            <form onSubmit={handleSubmit(handleParcelOrder)} className=' max-w-7xl mx-auto'>
                {/* document */}
                <div className='my-5'>

                    <label className="label font-semibold cursor-pointer">
                        <input
                            type="radio"
                            {...register('parcelType')}
                            value="document"
                            className="radio text-green-500 peer"
                            defaultChecked
                        />
                        <span className="ml-2 peer-checked:text-green-500">Document</span>
                    </label>


                    <label className="label font-semibold ml-5 cursor-pointer">
                        <input
                            type="radio"
                            {...register('parcelType')}
                            value="non-document"
                            className="radio text-green-500 peer"
                        />
                        <span className="ml-2 peer-checked:text-green-500">Non-Document</span>
                    </label>
                </div>

                {/* parcel info: name,  weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-14'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')}
                            className="input input-class" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelWeight')}
                            className="input input-class" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Sender Details */}
                    <div>
                        <h4 className='text-2xl font-semibold mb-5'>Sender Details</h4>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Name</label>
                            <input type="text" {...register('senderName')}
                                defaultValue={user?.displayName}
                                className="input input-class" placeholder="Sender Name" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Email</label>
                            <input type="text" {...register('senderEmail')}
                                defaultValue={user?.email}
                                className="input input-class" placeholder="Sender Email" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Address</label>
                            <input type="text" {...register('senderAddress')}
                                className="input input-class" placeholder="Sender Address" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Phone Number</label>
                            <input type="text" {...register('senderPhoneNumber')}
                                className="input input-class" placeholder="Sender Phone Number " />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Region</label>
                            <select {...register('senderRegion')} defaultValue="Pick a Region" className="select input-class">
                                <option disabled={true} className='bg-white text-gray-800'>Pick a Region</option>
                                {
                                    regions.map((r, i) => <option className='bg-white text-gray-800' key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Districts</label>
                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select input-class">
                                <option disabled={true} className='bg-white text-gray-800'>Pick a District</option>
                                {
                                    districtsByRegion(senderRegion).map((d, i) => <option className='bg-white text-gray-800' key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Area</label>
                            <select {...register('senderArea')} defaultValue="Pick a Area" className="select input-class">
                                <option disabled={true} className='bg-white text-gray-800' >Pick a Area</option>
                                {
                                    (senderAreas || []).map((s, i) => (<option className='bg-white text-gray-800' key={i} value={s}>{s}</option>))
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Text Area</label>
                            <textarea {...register('senderText')} cols="30" rows="5"
                                className='input-class p-3 text-base'
                                placeholder='Please Write Your Text...' />
                        </fieldset>
                    </div>

                    {/* Receiver Details */}
                    <div>
                        <h4 className='text-2xl font-semibold mb-5'>Receiver Details</h4>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName')}
                                className="input input-class" placeholder="Receiver Name" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Email</label>
                            <input type="text" {...register('receiverEmail')}
                                className="input input-class" placeholder="Receiver Email" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')}
                                className="input input-class" placeholder="Receiver Address" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Phone Number</label>
                            <input type="text" {...register('receiverPhoneNumber')}
                                className="input input-class" placeholder="Receiver Phone Number " />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Region</label>
                            <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select input-class">
                                <option disabled={true} className='bg-white text-gray-800'>Pick a Region</option>
                                {
                                    regions.map((r, i) => <option className='bg-white text-gray-800' key={i} value={r}>{r}</option>)
                                }

                            </select>
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Districts</label>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select input-class">
                                <option disabled={true} className='bg-white text-gray-800'>Pick a District</option>
                                {
                                    districtsByRegion(receiverRegion).map((d, i) => <option className='bg-white text-gray-800' key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Area</label>
                            <select {...register('receiverArea')} defaultValue="Pick a Area" className="select input-class">
                                <option disabled={true} className='bg-white text-gray-800'>Pick a Area</option>
                                {
                                    (receiverAreas || []).map((a, i) => (<option className='bg-white text-gray-800' key={i} value={a}>{a}</option>))
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Text Area</label>
                            <textarea {...register('receiverText')} cols="30" rows="5"
                                className='input-class p-3 text-base'
                                placeholder='Please Write Your Text...' />
                        </fieldset>
                    </div>
                </div>

                <input type="submit" className='btn text-base text-gray-800 rounded-lg bg-linear-to-r from-green-500 via-green-400  to-green-500 w-full hover:scale-[1.02] transition-all duration-200' value="send parcel" />
            </form>
        </div>
    );
};

export default ParcelOrder;