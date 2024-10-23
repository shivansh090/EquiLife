import React, { useState, useEffect } from 'react'
import profileimg from '../../assets/images/profile.png'
import { Card } from '../ui/card';
import { MdAddCircleOutline, MdEdit, MdVerifiedUser, MdContentCopy } from 'react-icons/md';
import  toast, {Toaster}  from 'react-hot-toast';
import EditModal from './EditModal';

const MyProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState([]);
    const [verified, setVerified] = useState(false);
    const [editField, setEditField] = useState(null);

    const fetchPersonalProfileDetails = () => {
        const storedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        setVerified(storedProfile.verified || false);
        setProfileData([
            { title: "Name", desc: storedProfile.name || null },
            { title: "Date of Birth", desc: storedProfile.dateofbirth || null },
            { title: "Phone Number", desc: storedProfile.phonenumber || null },
            { title: "Email", desc: storedProfile.email || null },
            { title: "Citizenship", desc: storedProfile.citizenship || null },
        ]);
        setLoading(false);
    };
      
    useEffect(() => {
        setLoading(true);
        fetchPersonalProfileDetails();
    }, []);

    useEffect(() => {
        console.log(profileData)
    }, [profileData])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }

    const handleEdit = (field, value) => {
        const storedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const updatedProfile = { ...storedProfile, [field]: value };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        fetchPersonalProfileDetails(); // Refresh the profile data
        toast.success("Profile updated successfully");
    };

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <Toaster position="top-center" />
            <Card>
                <div className='p-10 pb-20'>
                    <div className="flex relative px-6 py-1">
                        <div className="flex justify-end items-end">
                            <img
                                src={profileimg}
                                alt="avatar"
                                className="w-28 h-28 rounded-full"
                            />

                            {loading ? (
                                <div className="flex items-end gap-1 animate-pulse">
                                    <div className="w-20 h-3.5  bg-gray-100 rounded-full dark:bg-gray-700"></div>
                                </div>
                            ) : verified ? (
                                <span
                                    className="font-semibold flex gap-1"
                                    style={{ color: "#6D38C3" }}
                                >
                                    Verified <MdVerifiedUser size={20} />
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="px-1">
                        <div className="grid-cols-1 lg:grid-cols-2 grid gap-x-8 gap-y-5 md:gap-7">
                            {profileData.map((item, index) => (
                                <div key={index}>
                                    <h1 className="font-medium text-left text-base text-gray-500">{item.title} : </h1>
                                    {loading ? (
                                        <div role="status" className="max-w-sm animate-pulse">
                                            <div className="h-5 text-gray-500 bg-gray-100 rounded-full"></div>
                                        </div>
                                    ) : (
                                        <p className={`flex gap-4 items-center overflow-scroll no-scrollbar ${item.desc ? 'flex gap-2 text-xl font-medium' : 'text-red-600'}`} style={{ fontWeight: "430" }}>
                                            {item.desc || "Please Verify your ID for more information"}
                                            {item.title === 'Date of Birth' &&  (item.desc ? 
                                                <MdEdit 
                                                    color='grey' 
                                                    size={20} 
                                                    className="cursor-pointer" 
                                                    onClick={() => setEditField(item.title)} 
                                                /> : 
                                                <MdAddCircleOutline 
                                                    color='grey' 
                                                    size={20} 
                                                    className="cursor-pointer" 
                                                    onClick={() => setEditField(item.title)} 
                                                />)
                                            }
                                            {(item.title === "Phone Number" || item.title === "Email")  && item.desc && (
                                                <MdContentCopy 
                                                    onClick={() => handleCopy(item.desc)} 
                                                    className="cursor-pointer hover:scale-110 transition-all" 
                                                    size={18} 
                                                />
                                            )}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="h-5 bg-gray-100 rounded-full dark:bg-gray-700 w-[300px] mt-8 animate-pulse"></div>
                    ) : (
                        verified && (
                            <p className="font-light mt-10 text-sm text-gray-400">
                                This information can't be edited as it is fetched by your government issued document
                            </p>
                        )
                    )}
                </div>
            </Card>

            <EditModal
                isOpen={!!editField}
                onClose={() => setEditField(null)}
                title={`${profileData.find(item => item.title === editField)?.desc ? 'Edit' : 'Add'} ${editField}`}
                onSave={(value) => handleEdit(editField.toLowerCase().replace(/\s+/g, ''), value)}
                inputType={editField === "Date of Birth" ? "date" : editField === "Phone Number" ? "tel" : "text"}
            />
        </div>
    )
}

export default MyProfile