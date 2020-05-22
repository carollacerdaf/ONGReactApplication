import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){
    const [id_first, setIdFirst] = useState([]);
    const [id,setId] = useState('');
    const history = useHistory();

    useEffect(() => {
        api.get('ongs').then(response => {
            setIdFirst(response.data[0].id)
        })
    }, [id_first]);
    
    async function handleLogin(e) {
        e.preventDefault();
        try{
            const response = await api.post('session', {id});
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);

            history.push('/profile');
            
        } catch(err) {
            return (document.getElementById("error-message").innerHTML = `Falha no Login. Tente novamente.`)
        }
        
    }

    return (
    <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Be the Hero"/>
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>
                <p className="default-id">Id para teste: {id_first}</p>
                <input name="user-id" placeholder="Sua ID"
                value={id}
                onChange={e => setId(e.target.value)}/>
                <button className="button" type="submit">Entrar</button>
                <p className="error" id="error-message"></p>
                <p id="success-message"></p>
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={heroesImg} alt="Heroes"/>
    </div>
    );
}