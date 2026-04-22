import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuth } from '../../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import riderImg from '../../assets/agent-pending.png'

const Rider = () => {
    const { user } = useAuth();
    const axiosRider = useAxiosSecure();
    const serviceCenter = useLoaderData();

    const { register, handleSubmit, watch,
        formState: { errors }
    } = useForm();

    const regionsDuplicate = serviceCenter.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)];
    const riderRegion = watch("riderRegion");
    const riderDistrict = watch("riderDistrict");

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

    const riderAreas = areaByDistrict(riderRegion, riderDistrict);

    const handleRiderApplication = data => {
        console.log(data)
        axiosRider.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application submitted",
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: err.response?.data?.message || "Something went wrong"
                });
            });
    }

    return (
        <div>

            <form onSubmit={handleSubmit(handleRiderApplication)} className=' max-w-7xl mx-auto'>
                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                    {/* Rider Details */}
                    <div>
                        <h4 className='text-2xl font-semibold mb-5'>Rider Details</h4>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Name</label>
                            <input type="text" {...register('riderName')}
                                defaultValue={user?.displayName}
                                readOnly
                                className="input input-class" placeholder="rider Name" />

                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Email</label>
                            <input type="text" {...register('riderEmail')}
                                defaultValue={user?.email}
                                readOnly
                                className="input input-class" placeholder="rider Email" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider photo</label>
                            <input type="text" {...register('riderPhoto')}
                                defaultValue={user?.photoURL}
                                readOnly
                                className="input input-class" placeholder="Sender Email" />
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Address</label>
                            <input type="text" {...register('riderAddress', { required: "Rider Address is required" })}
                                className="input input-class" placeholder="rider Address" />
                            {errors.riderAddress && (
                                <span>{toast(errors.riderAddress.message)}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider NID</label>
                            <input type="text" {...register('riderNID', { required: "Rider NID is required" })}
                                className="input input-class" placeholder="rider NID" />
                            {errors.riderNID && (
                                <span>{toast(errors.riderNID.message)}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Driving License</label>
                            <input type="text" {...register('riderDrivingLicense', { required: "rider Driving License is required" })}
                                className="input input-class" placeholder="driving license" />
                            {errors.riderDrivingLicense && (
                                <span>{toast(errors.riderDrivingLicense.message)}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Bike INformation</label>
                            <input type="text" {...register('riderBikeINfo', { required: "Rider Bike INformation is required" })}
                                className="input input-class" placeholder="rider Address" />
                            {errors.riderBikeINfo && (
                                <span>{toast(errors.riderBikeINfo.message)}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Phone Number</label>
                            <input type="text" {...register('riderPhoneNumber', { required: "rider Phone Number is required" })}
                                className="input input-class" placeholder="rider Phone Number " />
                            {errors.riderPhoneNumber && (
                                <span>{toast(errors.riderPhoneNumber.message)}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Region</label>
                            <select
                                {...register('riderRegion', { required: "rider Region is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.riderRegion && (
                                <span>{toast(errors.riderRegion.message)}</span>
                            )}
                        </fieldset>

                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider District</label>
                            <select
                                {...register('riderDistrict', { required: "rider District is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick a District</option>
                                {districtsByRegion(riderRegion).map((d, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.riderDistrict && (
                                <span>{toast(errors.riderDistrict.message)}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Rider Area</label>
                            <select
                                {...register('riderArea', { required: "rider Area is required" })}
                                defaultValue=""
                                className="select input-class"
                            >
                                <option value="" disabled className='bg-white text-gray-800'>Pick an Area</option>
                                {(riderAreas || []).map((s, i) => (
                                    <option className='bg-white text-gray-800' key={i} value={s}>{s}</option>
                                ))}
                            </select>
                            {errors.riderArea && (
                                <span>{toast(errors.riderArea.message)}</span>
                            )}
                        </fieldset>
                        <fieldset className="fieldset mb-3">
                            <label className="label">Text Area</label>
                            <textarea {...register('riderText')} cols="30" rows="5"
                                className='input-class p-3 text-base'
                                placeholder='Please Write Your Extra Instruction...' />
                        </fieldset>
                    </div>

                    {/* Rider banner img */}
                    <div>
                        <img className='h-[900px]' src={riderImg} alt="" />
                    </div>
                </div>
                <div className='flex my-5'>
                    <input type="submit" className='btn px-8  text-lg text-gray-800 rounded-lg bg-linear-to-r from-green-500 via-green-400  to-green-500  hover:scale-[1.02] transition-all duration-200' value="Rider Application" />
                </div>
            </form>
        </div>
    );
};

export default Rider;