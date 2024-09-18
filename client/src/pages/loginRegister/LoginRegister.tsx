// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './loginRegister.css'; // Import CSS file

// const LoginRegister: React.FC = () => {
//     const [isLoginMode, setIsLoginMode] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('Initial isLoginMode:', isLoginMode);
//     }, []);

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 email,
//                 password,
//             });

//             if (response.status === 200) {
//                 const { token, role, ...user } = response.data;
//                 localStorage.setItem('authToken', token);
//                 localStorage.setItem('user', JSON.stringify({ ...user, role }));
//                 alert('Login successful!');
//                 navigate('/home');
//             } else {
//                 setError(response.data.message);
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     const handleRegister = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register', {
//                 firstName,
//                 lastName,
//                 email,
//                 password,
//             });

//             if (response.status === 201) {
//                 alert('Registration successful!');
//                 setIsLoginMode(true);
//             } else {
//                 setError(response.data.message);
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         if (isLoginMode) {
//             handleLogin();
//         } else {
//             handleRegister();
//         }
//     };

//     const toggleMode = () => {
//         setIsLoginMode((prevMode) => !prevMode);
//         setError(null);
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
//                 onClick={toggleMode}
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
























// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './loginRegister.css'; // Import CSS file

// const LoginRegister: React.FC = () => {
//     const [isLoginMode, setIsLoginMode] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('Initial isLoginMode:', isLoginMode);
//     }, [isLoginMode]);

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 email,
//                 password,
//             });

//             if (response.status === 200) {
//                 const { token, role, ...user } = response.data;
//                 localStorage.setItem('authToken', token);
//                 localStorage.setItem('user', JSON.stringify({ ...user, role }));

//                 // Optionally, update the state here if you use context for user information
//                 // setUser({...user, role});

//                 alert('Login successful!');
//                 navigate('/home', { replace: true }); // Ensure replace is set to avoid adding history
//             } else {
//                 setError(response.data.message);
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };


//     const handleRegister = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register', {
//                 firstName,
//                 lastName,
//                 email,
//                 password,
//             });

//             if (response.status === 201) {
//                 const { token, role, ...user } = response.data;
//                 localStorage.setItem('authToken', token);
//                 localStorage.setItem('user', JSON.stringify({ ...user, role }));
//                 alert('Registration successful!');
//                 navigate('/home'); // Redirect to home after successful registration
//             } else {
//                 setError(response.data.message);
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         if (isLoginMode) {
//             handleLogin();
//         } else {
//             handleRegister();
//         }
//     };

//     const toggleMode = () => {
//         setIsLoginMode((prevMode) => !prevMode);
//         setError(null);
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
//                 onClick={toggleMode}
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
import { setUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
// import { useUser } from '../userContext/UserContext'; // Import the user context

const LoginRegister: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    // const { setUser } = useUser(); // Use the setUser function from the user context
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('Initial isLoginMode:', isLoginMode);
    }, [isLoginMode]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { token, role, ...user } = response.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify({ ...user, role }));
                dispatch(setUser({ ...user, role })); // Update the user context
                alert('Login successful!');
                navigate('/home');
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
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                firstName,
                lastName,
                email,
                password,
            });

            if (response.status === 201) {
                const { token, role, ...user } = response.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify({ ...user, role }));
                dispatch(setUser({ ...user, role })); // Update the user context
                alert('Registration successful!');
                navigate('/home'); // Redirect to home after successful registration
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
        if (isLoginMode) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const toggleMode = () => {
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














// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './loginRegister.css';

// const LoginRegister: React.FC = () => {
//     const [isLoginMode, setIsLoginMode] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('Initial isLoginMode:', isLoginMode);
//     }, []);

//     const handleLogin = async () => {
//         try {
//             console.log('Attempting login with:', { email, password }); // Add this line
//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 email,
//                 password,
//             });

//             if (response.status === 200) {
//                 const { token, role, ...user } = response.data;
//                 localStorage.setItem('authToken', token);
//                 localStorage.setItem('user', JSON.stringify({ ...user, role }));
//                 alert('Login successful!');
//                 navigate('/home');
//             } else {
//                 setError(response.data.message);
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     const handleRegister = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register', {
//                 firstName,
//                 lastName,
//                 email,
//                 password,
//             });

//             if (response.status === 201) {
//                 alert('Registration successful!');
//                 setIsLoginMode(true);
//             } else {
//                 setError(response.data.message);
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//             setError('Something went wrong. Please try again.');
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         if (isLoginMode) {
//             handleLogin();
//         } else {
//             handleRegister();
//         }
//     };

//     const toggleMode = () => {
//         setIsLoginMode((prevMode) => !prevMode);
//         setError(null);
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
//                 onClick={toggleMode}
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
