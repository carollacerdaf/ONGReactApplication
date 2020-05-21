import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'
import './style.css';
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = new useHistory();

    async function handleRegister(e) {
        e.preventDefault(); //previne que a pag recarregue
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);
            return (document.getElementById("success-message").innerHTML = `Seu ID de acesso: ${response.data.id}`)
            history.push('/');
        } catch (err) {
            return (document.getElementById("error-message").innerHTML = `Ops! Ocorreu um erro no cadastro.`)
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para o Logon
                </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input id="name" name="ong name" placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input id="email" name="e-mail" type="email" placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input id="whats" name="whatsapp" placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input id="city" placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />

                        <input id="uf" placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </div>

                    <button type="submit" className="button">Cadastrar</button>
                    <p className="error" id="error-message"></p>
                    <p className="success" id="success-message"></p>
                </form>

            </div>
        </div>
    );
}