import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import { selectLoggedInUser } from '../../auth/authSlice';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser } from '../../auth/authSlice';

const UserProfile = () => {
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    //correct
    // const user = useSelector(selectUserInfo);

    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();
    // const orders = useSelector(selectUserOrders);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const handleEdit = (addressUpdate, index) => {
        const newUser = { ...user, addresses: [...user.addresses] }; // shallow copy issue
        newUser.addresses.splice(index, 1, addressUpdate);
        dispatch(updateUserAsync(newUser));
        setSelectedEditIndex(-1);

    }
    const handleRemove = (e, index) => {
        console.log("remove", index);
        const newUser = { ...user, addresses: [...user.addresses] }; // shallow copy issue
        newUser.addresses.splice(index, 1);
        dispatch(updateUserAsync(newUser));
    }
    const handleEditForm = (index) => {
        setSelectedEditIndex(index);
        const address = user.addresses[index];
        setValue("name", address.name);
        setValue("email", address.email);
        setValue("street", address.street);
        setValue("city", address.city);
        setValue("phone", address.phone);
        setValue("state", address.state);
        setValue("pinCode", address.pinCode);


    }

const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
}

    return (
        <div>
            <div className="mx-auto mt-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl my-5 pt-5 font-bold tracking-tight text-gray-900">Name : {user.name ? user.name : "Guest User"} </h1>
                <h3 className="text-2xl my-5 pt-5 font-bold tracking-tight text-gray-900">Email Address : {user.email} </h3>
              {
                user.role==="admin" && (
                    <h3 className="text-2xl my-5 pt-5 font-bold tracking-tight text-gray-900">User : {user.role} </h3>

                )
              }

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

                    {/*--address--*/}
                    <button
                    onClick={() => {setShowAddAddressForm(true);setSelectedEditIndex(-1)}}
                        type="submit"
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add New Address
                    </button>
                    {showAddAddressForm ? (
                                <form className='bg-white px-5 mt-8 py-5' noValidate onSubmit={handleSubmit((data) => {
                                    handleAdd(data);
                                    //to clear submitted form
                                    reset();
                                    // console.log(data);
                                })}>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Full name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("name", { required: "Name is required" })}
                                                            id="name"
                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>



                                                <div className="sm:col-span-4">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register("email", { required: "Email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, message: "Invalid email address" } })}

                                                            type="email"
                                                            autoComplete="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                        phone
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="phone"
                                                            {...register("phone", { required: "Phone is required" })}
                                                            type="tel"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Street address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("street", { required: "Street is required" })}
                                                            id="street"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("city", { required: "City is required" })}
                                                            id="city"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State / Province
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("state", { required: "State is required" })}
                                                            id="state"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                        ZIP / Postal code
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("pinCode", { required: "PinCode is required" })}
                                                            id="pinCode"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button type="button" onClick={() => setShowAddAddressForm(false)} className="text-sm font-semibold leading-6 text-gray-900">
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                               Add Address
                                            </button>
                                        </div>


                                    </div>

                                </form>
                            ) : null

                            }
                    <h4 className=" my-5 pt-5 font-bold tracking-tight text-gray-900">Your Addresses :</h4>

                    {user.addresses && user.addresses.map((address, index) => (

                        <div key={index}>
                            {selectedEditIndex === index && (
                                <form className='bg-white px-5 mt-8 py-5' noValidate onSubmit={handleSubmit((data) => {
                                    handleEdit(data, index);
                                    reset()
                                    console.log(data);
                                })}>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Full name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("name", { required: "Name is required" })}
                                                            id="name"
                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>



                                                <div className="sm:col-span-4">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register("email", { required: "Email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, message: "Invalid email address" } })}

                                                            type="email"
                                                            autoComplete="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                        phone
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="phone"
                                                            {...register("phone", { required: "Phone is required" })}
                                                            type="tel"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Street address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("street", { required: "Street is required" })}
                                                            id="street"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("city", { required: "City is required" })}
                                                            id="city"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State / Province
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("state", { required: "State is required" })}
                                                            id="state"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                        ZIP / Postal code
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("pinCode", { required: "PinCode is required" })}
                                                            id="pinCode"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button type="button" onClick={() => setSelectedEditIndex(-1)} className="text-sm font-semibold leading-6 text-gray-900">
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Edit Address
                                            </button>
                                        </div>


                                    </div>

                                </form>
                            )

                            }

                            <div className="border-2 border-gray-200 px-5 flex justify-between gap-x-6 py-5">
                                <div className="flex gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>

                                    </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900 font-semibold">Phone : {address.phone}</p>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {address.state}
                                    </p>

                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">

                                    <button
                                        onClick={(e) => handleEditForm(index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => handleRemove(e, index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Remove
                                    </button>

                                </div>
                            </div>

                        </div>






                    ))}
                    {/*address ends*/}

                </div>
            </div>
        </div>
    )
}

export default UserProfile;