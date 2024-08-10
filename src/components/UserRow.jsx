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
            <h1 className="text-white text-4xl py-5">
                Welcome, <strong>{userInfo.username}</strong>
            </h1>
            <div className="border-white text-highlight border-2 w-full h-[300px] rounded-lg flex flex-row">
                <table>
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td>
                                {!isEditing ? (
                                    userInfo.email
                                ) : (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>
                                {!isEditing ? (
                                    '********'
                                ) : (
                                    <input
                                        type="password"
                                        name="password"
                                        value="**********"
                                        onChange={handleChange}
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>
                                        {isEditing ? (
                                            <button onClick={saveEditHandler}>Save</button>
                                        ) : (
                                            <button onClick={saveEditHandler}>Edit Profile</button>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                        {error && (
                            <tr>
                                <td colSpan="2">
                                    <p style={{ color: 'red' }}>{error}</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
