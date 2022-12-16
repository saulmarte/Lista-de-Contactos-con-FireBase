import { ref, set, update, remove, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { uid } from 'uid'
import ModalCreate from '../components/ModalCreate'
import ModalEmail from '../components/ModalEmail'
import { useAuth } from '../context/AuthContext'
import { database } from '../firebase/firebase'
import '../styles/crud.css'

const CRUD = () => {

    const { user, logout, isLoading } = useAuth();

    const handleLogOut = async () => {
        await logout()
    }

    const [contacts, setContacts] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState("")

    //fields
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    //fields

    const [openModal, setOpenModal] = useState(false)
    const [openModalEmail, setOpenModalEmail] = useState(false)

    //handleToChanges
    const handleToChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleToChangeLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleToChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    //handleToChanges

    //C.R.U.D
    const CreateToDatabase = () => {
        const uuid = uid();
        set(ref(database, `/${uuid}`), {
            uuid,
            firstName,
            lastName,
            email
        })

        setFirstName("");
        setLastName("");
        setEmail("");
        setOpenModal(false);
    }

    //Read
    useEffect(() => {
        onValue(ref(database), (snapshot) => {
            setContacts([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map((firstName) => {
                    setContacts((oldArray) => [...oldArray, firstName]);
                })
            }
        })
    }, [])
    //Update
    const handleUpdate = (data) => {
        setIsEdit(true);
        setOpenModal(true);
        setTempUuid(data.uuid);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
    }

    const handleSubmitChange = () => {
        update(ref(database, `/${tempUuid}`), {
            firstName,
            lastName,
            email,
            uuid: tempUuid,
        });

        setFirstName("");
        setLastName("");
        setEmail("");
        setOpenModal(false);
        setIsEdit(false);
    }
    //Delete
    const handleDelete = (data) => {
        remove(ref(database, `/${data.uuid}`))
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleReset = () => {
        setIsEdit(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setOpenModal(false);
    }

    const handleOpenModalEmail = (data) => {
        setOpenModalEmail(true)
        setEmail(data.email)
        setFirstName(data.firstName)
    }

    const handleCloseModalEmail = () => {
        setOpenModalEmail(false)
        setFirstName("")
        setEmail("")
    }

    return (
        <div className="Home__container container">
            {
                isLoading
                    ?
                    <h1>Esta cargando</h1>
                    :
                    <div className='CRUD'>
                        {
                            openModal ?
                                <ModalCreate

                                    handleToChangeFirstName={handleToChangeFirstName}
                                    handleToChangeLastName={handleToChangeLastName}
                                    handleToChangeEmail={handleToChangeEmail}
                                    handleReset={handleReset}

                                    CreateToDatabase={CreateToDatabase}
                                    handleSubmitChange={handleSubmitChange}

                                    firstName={firstName}
                                    lastName={lastName}
                                    email={email}
                                    isEdit={isEdit}
                                />
                                :
                                <></>
                        }
                        {
                            openModalEmail ?
                                <ModalEmail

                                    handleCloseModalEmail={handleCloseModalEmail}

                                    firstName={firstName}
                                    email={email}
                                />
                                :
                                <></>
                        }

                        <h1 className='tittle__home card-panel'>Lista de Contactos</h1>
                        <div className="btn__create">
                            <button class="waves-effect waves-light btn #35CE8D" onClick={handleOpenModal}><i class="material-icons left">add</i>Crear Nuevo Contacto</button>
                        </div>
                        <table className='personal__table responsive-table centered striped'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Actualizar</th>
                                    <th>Enviar Email</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(contact => (
                                    <tr key={contact.uuid}>
                                        <td>{contact.firstName}</td>
                                        <td>{contact.lastName}</td>
                                        <td>{contact.email}</td>
                                        <td><button className='waves-effect waves-light btn-small #35CE8D' onClick={() => handleUpdate(contact)}><i class="material-icons left">update</i>Actualizar</button></td>
                                        <td><button className='waves-effect waves-light btn-small #35CE8D' onClick={() => handleOpenModalEmail(contact)}><i class="material-icons left">send</i>Mail</button></td>
                                        <td><button className='waves-effect waves-light btn-small red' onClick={() => handleDelete(contact)}><i class="material-icons left">delete</i>Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="logout__btn">
                            <button className='waves-effect waves-light btn #f44336 red' onClick={handleLogOut}><i class="material-icons left">lock</i>Cerrar Sesion</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CRUD