import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/register.css'

const Register = () => {

    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });

    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState() //Para gestionar los errores y ponerlos mas visibles

    const handleChange = ({ target: { name, value } }) => {
        setDataUser({ ...dataUser, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await signup(dataUser.email, dataUser.password)
            navigate('/LogIn')
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }

    return (
        <div className='Register__container z-depth-3'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form__email">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='Idemail' placeholder='example@example.com' onChange={handleChange} />
                </div>
                <div className="form__password">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='Idpassword' placeholder='enter your password' onChange={handleChange} />
                </div>
                <div className="form__btn">
                    <button className='btn waves-effect waves-light z-depth-2'>Sign Up</button>
                </div>
            </form>
            {
                error
                    ?
                    <div className="#c62828 red darken-3 error-panel z-depth-1">{error}</div>
                    :
                    <div></div>
            }
        </div>
    )
}

export default Register