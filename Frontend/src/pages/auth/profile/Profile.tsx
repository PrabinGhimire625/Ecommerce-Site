import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteUser, fetchUserProfile, removeUserProfile } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate=useNavigate()
    const { userProfile, status } = useAppSelector((state) => state.auth);
    console.log(userProfile)
    
    useEffect(() => {
        dispatch(fetchUserProfile()); // Fetch user profile data when component mounts
    }, [dispatch ]);


    const handleDeleteUser = (id: string | undefined) => {
        if (id) {
            console.log(id)
            dispatch(deleteUser(id));
            dispatch(removeUserProfile())
            localStorage.removeItem('token')
            alert("Successfully deleted the user") 
            navigate("/register")
        }
    };

    console.log(userProfile);
    console.log(status);

    return (
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
            <div className="rounded-t-lg h-32 overflow-hidden">
                <img
                    className="object-cover object-top w-full"
                    src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    alt="Mountain"
                />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img
                    className="object-cover object-center h-32"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    alt="User"
                />
            </div>
            <div className="text-center mt-2">
                <h2 className="font-semibold">{userProfile?.username}</h2> 
                <p className="text-gray-500">{userProfile?.email}</p>
            </div>
            <div className="p-4 border-t mx-8 mt-2 flex justify-between">
                <button className="w-1/2 mr-2 rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
                    Update
                </button>
                <button
                    onClick={() => handleDeleteUser(userProfile?.id)}
                    className="w-1/2 ml-2 rounded-full bg-red-600 hover:shadow-lg font-semibold text-white px-6 py-2"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Profile;
