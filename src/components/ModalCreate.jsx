import React from 'react'
import '../styles/modal.css'

const ModalCreate = ({ handleToChangeFirstName, handleToChangeLastName, handleToChangeEmail, firstName, lastName, email, isEdit, CreateToDatabase, handleSubmitChange, handleReset }) => {
    return (
        <div className='modal__container'>
            <div className="modal__card ">
                {
                    isEdit ? <h3>Actualizar Data</h3>
                        : <h3>Crear Data</h3>
                }
                <div className='modal__firstName'>
                    <label htmlFor="firstName">Nombre</label>
                    <input type="text" name='firstName' id='IdfirstName' placeholder='Introduzca el Nombre' value={firstName} onChange={handleToChangeFirstName} />
                </div>

                <div className='modal__lastName'>
                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" name='lastName' id='IdlastName' placeholder='Introduzca el Apellido' value={lastName} onChange={handleToChangeLastName} />
                </div>

                <div className='modal__email'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='Idemail' placeholder='Introduzca el Email' value={email} onChange={handleToChangeEmail} />
                </div>

                {isEdit ? (
                    <div className='btns__update__modal'>
                        <button onClick={handleSubmitChange} className='waves-effect waves-light btn #35CE8D'><i class="material-icons left">send</i>Actualizar</button>
                        <button onClick={handleReset} className='waves-effect waves-light btn red'><i class="material-icons left">close</i>Cerrar</button>
                    </div>
                ) : (
                    <div className="btns__create__modal">
                        <button onClick={CreateToDatabase} className='waves-effect waves-light btn #35CE8D'>Crear</button>
                        <button onClick={handleReset} className='waves-effect waves-light btn red'><i class="material-icons left">close</i>Cerrar</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModalCreate