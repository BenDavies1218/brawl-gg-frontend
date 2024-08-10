import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserRow({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: user?.password || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const saveEditHandler = async () => {
        if (isEditing) {
            try {
                const localToken = localStorage.getItem('authToken');
                if (!localToken) {
                    navigate('/login');
                    return;
                }

                setLoading(true);
                const response = await fetch('https://brawl-gg-backend.onrender.com/user', {
                    method: 'PATCH',
                    headers: {
                        'jwt': localToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                });

                if (!response.ok) {
                    throw new Error('Failed to update user');
                }

                alert('Profile updated successfully');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                setIsEditing(false);
            }
        } else {
            setIsEditing(true);
        }
    };

    return (
        <>
            <h1 className="text-white text-4xl py-10 flex items-start">
                Welcome, <strong>{userInfo.username}</strong>
            </h1>
            <div className="border-2 border-white bg-black text-white w-full h-[300px] rounded-lg flex flex-col p-4 mb-5">
                <table className="w-full border-collapse">
                    <tbody className="text-xl">
                        <tr>
                            <td className="py-4 px-6 border-b border-white"><strong>Email:</strong></td>
                            <td className="py-4 px-6 border-b border-white">
                                {!isEditing ? (
                                    userInfo.email
                                ) : (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                        className="bg-white text-black border border-white rounded-md px-3 py-1"
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 border-b border-white"><strong>Password:</strong></td>
                            <td className="py-4 px-6 border-b border-white">
                                {!isEditing ? (
                                    '********'
                                ) : (
                                    <input
                                        type="password"
                                        name="password"
                                        value={userInfo.password}
                                        onChange={handleChange}
                                        className="bg-white text-black border border-white rounded-md px-3 py-1"
                                    />
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end mt-auto">
                    {loading ? (
                        <p className="text-white">Loading...</p>
                    ) : (
                        <>
                            {isEditing ? (
                                <button
                                    className="max-w-fit px-5 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer relative hover:bg-amber-500 active:bg-amber-400"
                                    onClick={saveEditHandler}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="max-w-fit px-5 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer relative hover:bg-amber-500 active:bg-amber-400"
                                    onClick={saveEditHandler}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
