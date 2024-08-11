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
                Welcome,<strong className="text-highlight">{userInfo.username}</strong>
              </h1>
              <div className="border-2 border-temp-black bg-black text-white w-full h-[300px] rounded-lg flex flex-col p-4 mb-5">
                <table className="w-auto border-collapse">
                  <tbody className="text-lg">
                    <tr>
                      <td className="py-6 px-6 text-left border-b border-temp-black text-highlight"><strong>Email:</strong></td>
                      <td className="py-6 px-6 text-right border-b border-temp-black">
                        {!isEditing ? (
                          userInfo.email
                        ) : (
                          <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            className="bg-white text-black border border-temp-black rounded-md px-3 py-1 focus:border-[#fbae3c] outline-none"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-6 px-6 text-left border-b border-temp-black text-highlight"><strong>Password:</strong></td>
                      <td className="py-6 px-6 text-right border-b border-temp-black">
                        {!isEditing ? (
                          '***********************'
                        ) : (
                          <input
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            className="bg-white text-black border border-temp-black rounded-md px-3 py-1 focus:border-[#fbae3c] outline-none"
                          />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end mt-auto">
                  {loading ? (
                    <p className="text-highlight">Loading...</p>
                  ) : (
                    <button
                      className="px-5 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer hover:bg-[#f8a32a] active:bg-[#e89c1b] transition-colors duration-300"
                      onClick={saveEditHandler}
                    >
                      {isEditing ? 'Save' : 'Edit Profile'}
                    </button>
                  )}
                </div>
              </div>
            </>
    );
}
