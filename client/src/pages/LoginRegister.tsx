// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './loginRegister.css'; // Import CSS file

// const LoginRegister: React.FC = () => {
//     const [isLoginMode, setIsLoginMode] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         const url = isLoginMode ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//         const body = isLoginMode
//             ? { email, password }
//             : { firstName, lastName, email, password };

//         console.log('Sending request to:', url);
//         console.log('Request payload:', body);

//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(body),
//         });

//         const data = await response.json();
//         console.log('Response data:', data);

//         if (response.ok) {
//             if (isLoginMode) {
//                 navigate('/home');
//             } else {
//                 setIsLoginMode(true);
//             }
//         } else {
//             console.error('Error:', data.message);
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
//             <form onSubmit={handleSubmit}>
//                 {!isLoginMode && (
//                     <>
//                         <input
//                             type="text"
//                             name="firstName"
//                             placeholder="First Name"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="lastName"
//                             placeholder="Last Name"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             required
//                         />
//                     </>
//                 )}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
//             </form>
//             <a
//                 href="#"
//                 onClick={() => setIsLoginMode((prevMode) => !prevMode)}
//                 className="toggle-link"
//             >
//                 {isLoginMode
//                     ? "Don't have an account? Register"
//                     : 'Already have an account? Login'}
//             </a>
//         </div>
//     );
// };

// export default LoginRegister;













// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './loginRegister.css'; // Import CSS file

// const LoginRegister: React.FC = () => {
//     const [isLoginMode, setIsLoginMode] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         const url = isLoginMode ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//         const body = isLoginMode
//             ? { email, password }
//             : { firstName, lastName, email, password };

//         console.log('Sending request to:', url);
//         console.log('Request payload:', body);

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(body),
//             });

//             const data = await response.json();
//             console.log('Response data:', data);

//             if (response.ok) {
//                 if (isLoginMode) {
//                     alert('Login successful!');
//                     navigate('/home');
//                 } else {
//                     alert('Registration successful!');
//                     setIsLoginMode(true);
//                 }
//             } else {
//                 setError(data.message);
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 {!isLoginMode && (
//                     <>
//                         <input
//                             type="text"
//                             name="firstName"
//                             placeholder="First Name"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="lastName"
//                             placeholder="Last Name"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             required
//                         />
//                     </>
//                 )}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
//             </form>
//             <a
//                 href="#"
//                 onClick={() => {
//                     setIsLoginMode((prevMode) => !prevMode);
//                     setError(null);
//                 }}
//                 className="toggle-link"
//             >
//                 {isLoginMode
//                     ? "Don't have an account? Register"
//                     : 'Already have an account? Login'}
//             </a>
//         </div>
//     );
// };

// export default LoginRegister;















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './loginRegister.css'; // Import CSS file

// const LoginRegister: React.FC = () => {
//     const [isLoginMode, setIsLoginMode] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log('Form submitted');

//         const url = isLoginMode ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//         const body = isLoginMode
//             ? { email, password }
//             : { firstName, lastName, email, password };

//         console.log('Sending request to:', url);
//         console.log('Request payload:', body);

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(body),
//             });

//             const data = await response.json();
//             console.log('Response data:', data);

//             if (response.ok) {
//                 if (isLoginMode) {
//                     alert('Login successful!');
//                     navigate('/home');
//                 } else {
//                     alert('Registration successful!');
//                     setIsLoginMode(true);
//                 }
//             } else {
//                 setError(data.message);
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 {!isLoginMode && (
//                     <>
//                         <input
//                             type="text"
//                             name="firstName"
//                             placeholder="First Name"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="lastName"
//                             placeholder="Last Name"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             required
//                         />
//                     </>
//                 )}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
//             </form>
//             <a
//                 href="#"
//                 onClick={() => {
//                     setIsLoginMode((prevMode) => !prevMode);
//                     setError(null);
//                 }}
//                 className="toggle-link"
//             >
//                 {isLoginMode
//                     ? "Don't have an account? Register"
//                     : 'Already have an account? Login'}
//             </a>
//         </div>
//     );
// };

// export default LoginRegister;












import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginRegister.css'; // Import CSS file

const LoginRegister: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Initial isLoginMode:', isLoginMode);
    }, []);

    const handleLogin = async () => {
        console.log('Logging in with:', { email, password });

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Login response status:', response.status);
            console.log('Login response data:', response.data);

            if (response.status === 200) {
                const { token } = response.data; // Adjust according to your backend response
                if (token) {
                    localStorage.setItem('authToken', token); // Save the token in local storage
                    alert('Login successful!');
                    navigate('/home');
                } else {
                    alert('Login failed, no token received');
                }
            } else {
                setError(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Something went wrong. Please try again.');
            alert('Something went wrong. Please try again.');
        }
    };

    const handleRegister = async () => {
        console.log('Registering with:', { firstName, lastName, email, password });

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                firstName,
                lastName,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Register response status:', response.status);
            console.log('Register response data:', response.data);

            if (response.status === 201) {
                alert('Registration successful!');
                setIsLoginMode(true);
            } else {
                setError(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Something went wrong. Please try again.');
            alert('Something went wrong. Please try again.');
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form submitted');
        console.log('Is login mode:', isLoginMode);

        if (isLoginMode) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const toggleMode = () => {
        console.log('Toggling mode');
        setIsLoginMode((prevMode) => !prevMode);
        setError(null);
    };

    return (
        <div className="auth-container">
            <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                {!isLoginMode && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
            </form>
            <a
                href="#"
                onClick={toggleMode}
                className="toggle-link"
            >
                {isLoginMode
                    ? "Don't have an account? Register"
                    : 'Already have an account? Login'}
            </a>
        </div>
    );
};

export default LoginRegister;