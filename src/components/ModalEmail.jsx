import React from 'react';
import '../styles/modal.css';
import emailjs from 'emailjs-com';

const ModalEmail = ({ email, handleCloseModalEmail, firstName }) => {

    const handleSendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_hqiblac', 'template_h8kl0id', e.target, 'uK_szZ61rBTYzZbcE')
            .then((result) => {
                console.log(result.text);
                handleCloseModalEmail();
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <section className="modal__container">
            <article className="modal__email__card">
                <h3>Mailer</h3>
                <form className='modalEmail__form' onSubmit={handleSendEmail}>

                    <div className="form__email">
                        <label htmlFor="user_email">Email</label>
                        <input type="email" name="user_email" value={email} />
                    </div>

                    <div className="form__name">
                        <label htmlFor="user_name">Nombre</label>
                        <input type="text" name="user_name" value={firstName} />
                    </div>

                    <div className="form__textArea input-field">
                        <label htmlFor="user_message">Mensaje</label>
                        <textarea name="user_message" id="textarea1" className='materialize-textarea' cols="30" rows="5"></textarea>
                    </div>

                    <div className="modalEmail__btns">
                        <button className='waves-effect waves-light btn-small #35CE8D'><i class="material-icons left">send</i>Enviar</button>
                    </div>
                </form>
                <div className="modalEmail__btn">
                    <button onClick={handleCloseModalEmail} className="waves-effect waves-light btn-small red"><i class="material-icons left">close</i>Cerrar</button>
                </div>
            </article>
        </section>
    )
}

export default ModalEmail