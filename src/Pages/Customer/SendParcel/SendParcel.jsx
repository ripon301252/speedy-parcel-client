import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useAuth } from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';


const SendParcel = () => {
    const { register, handleSubmit, watch, setValue,
        formState: { errors }
    } = useForm();
    const { user } = useAuth();
    const axiosSendParcel = useAxiosSecure();
    const serviceCenter = useLoaderData();
    const regionsDuplicate = serviceCenter.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = watch("senderRegion");
    const senderDistrict = watch("senderDistrict");
    const receiverRegion = watch("receiverRegion");
    const receiverDistrict = watch("receiverDistrict");
    const navigate = useNavigate();
    const parcelType = watch("parcelType");

    useEffect(() => {
        if (parcelType === "document") {
            setValue("parcelWeight", 0);
        }
    }, [parcelType, setValue]);

    const districtsByRegion = region => {
        const regionDistricts = serviceCenter.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
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



    const handleSendParcel = (data) => {
        console.log(data)
        data.riderEmail = user.email;
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
        data.cost = cost;

        Swal.fire({
            title: "Agree with the cost",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue to Payment"
        }).then((result) => {
            if (result.isConfirmed)
                // save order to database
                axiosSendParcel.post('/parcels', data).then(res => {
                    console.log("after saving data", res.data)
                    if (res.data.insertedId) {
                        navigate('/my-parcels');
                        Swal.fire(
                            "Success!",
                            "Your parcel has been sent. Please proceed to payment.",
                            "success"
                        );
                    }
                })

        });
    }

    return (
        <div className='lg:py-10 py-5'>
            <h1 className='lg:text-5xl text-3xl font-bold lg:ml-8 lg:text-left text-center '>Send A Parcel</h1>
            <p className='lg:my-5 text-sm lg:ml-8 lg:text-left text-center mt-3'>Enter your parcel details</p>
            <form onSubmit={handleSubmit(handleSendParcel)} className=' lg:max-w-7xl lg:mx-auto mx-2 lg:text-left text-center'>
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
                        <input type="text" {...register('parcelName', { required: "parcel name is required" })}
                            className="input input-class" placeholder="Parcel Name" />
                        {errors.parcelName && (
                            <span className="text-xs text-orange-400">{errors.parcelName.message}</span>
                        )}
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input
                            type="number"
                            disabled={parcelType === "document"}
                            {...register('parcelWeight', {
                                required: parcelType !== "document" ? "Parcel weight is required" : false,
                            })}
                            className="input input-class"
                            placeholder="Parcel Weight"
                        />
                        {
                            parcelType === "document" && (
                                <p className="text-xs text-orange-400">Weight not required for documents</p>
                            )
                        }
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
                                readOnly
                                className="input input-class" placeholder="Sender Name" />

                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Email</label>
                            <input type="text" {...register('senderEmail')}
                                defaultValue={user?.email}
                                readOnly
                                className="input input-class" placeholder="Sender Email" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender photo</label>
                            <input type="text" {...register('senderPhoto')}
                                defaultValue={user?.photoURL}
                                readOnly
                                className="input input-class" placeholder="Sender Email" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Address</label>
                            <input type="text" {...register('senderAddress', { required: "Sender Address is required" })}
                                className="input input-class" placeholder="Sender Address" />
                            {errors.senderAddress && (
                                <span className="text-xs text-orange-400">{errors.senderAddress.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Phone Number</label>
                            <input type="text" {...register('senderPhoneNumber', { required: "Sender Phone Number is required" })}
                                className="input input-class" placeholder="Sender Phone Number " />
                            {errors.senderPhoneNumber && (
                                <span className="text-xs text-orange-400">{errors.senderPhoneNumber.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Region</label>
                            <select
                                {...register('senderRegion', { required: "Sender Region is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.senderRegion && (
                                <span className="text-xs text-orange-400">{errors.senderRegion.message}</span>
                            )}
                        </fieldset>

                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender District</label>
                            <select
                                {...register('senderDistrict', { required: "Sender District is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick a District</option>
                                {districtsByRegion(senderRegion).map((d, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.senderDistrict && (
                                <span className="text-xs text-orange-400">{errors.senderDistrict.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Sender Area</label>
                            <select
                                {...register('senderArea', { required: "Sender Area is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick an Area</option>
                                {(senderAreas || []).map((s, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={s}>{s}</option>
                                ))}
                            </select>
                            {errors.senderArea && (
                                <span className="text-xs text-orange-400">{errors.senderArea.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Text Area</label>
                            <textarea {...register('senderText')} cols="30" rows="5"
                                className='input-class p-3 text-base'
                                placeholder='Please Write Your Extra Instruction...' />
                        </fieldset>
                    </div>

                    {/* Receiver Details */}
                    <div>
                        <h4 className='text-2xl font-semibold mb-5'>Receiver Details</h4>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName', { required: "Receiver Name is Required" })}
                                className="input input-class" placeholder="Receiver Name" />
                            {errors.receiverName && (
                                <span className="text-xs text-orange-400">{errors.receiverName.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Email</label>
                            <input type="text" {...register('receiverEmail', { required: "Receiver Email is Required" })}
                                className="input input-class" placeholder="Receiver Email" />
                            {errors.receiverEmail && (
                                <span className="text-xs text-orange-400">{errors.receiverEmail.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register('receiverAddress', { required: "Receiver Address is Required" })}
                                className="input input-class" placeholder="Receiver Address" />
                            {errors.receiverAddress && (
                                <span className="text-xs text-orange-400">{errors.receiverAddress.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Phone Number</label>
                            <input type="text" {...register('receiverPhoneNumber', { required: "Receiver Phone Number is Required" })}
                                className="input input-class" placeholder="Receiver Phone Number " />
                            {errors.receiverPhoneNumber && (
                                <span className="text-xs text-orange-400">{errors.receiverPhoneNumber.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Region</label>
                            <select
                                {...register('receiverRegion', { required: "Receiver Region is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.receiverRegion && (
                                <span className="text-xs text-orange-400">{errors.receiverRegion.message}</span>
                            )}
                        </fieldset>

                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver District</label>
                            <select
                                {...register('receiverDistrict', { required: "Receiver District is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick a District</option>
                                {districtsByRegion(receiverRegion).map((d, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.receiverDistrict && (
                                <span className="text-xs text-orange-400">{errors.receiverDistrict.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Receiver Area</label>
                            <select
                                {...register('receiverArea', { required: "Receiver Area is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick an Area</option>
                                {(receiverAreas || []).map((a, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={a}>{a}</option>
                                ))}
                            </select>
                            {errors.receiverArea && (
                                <span className="text-xs text-orange-400">{errors.receiverArea.message}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Text Area</label>
                            <textarea {...register('receiverText')} cols="30" rows="5"
                                className='input-class p-3 text-base'
                                placeholder='Please Write Your Extra Instruction...' />
                        </fieldset>
                        <div className='flex my-9'>
                            <input type="submit" className='btn px-8 w-full  text-lg text-gray-800 rounded-lg bg-linear-to-r from-green-500 via-green-400  to-green-500  hover:scale-[1.02] transition-all duration-200' value="send parcel" />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default SendParcel;