import React, {useState} from 'react';

import './styles.css'
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {title, description, value};

        try{
            await api.post('incidents',data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        }catch(err){
            return (document.getElementById("error-message").innerHTML = `Ops! Incidente não foi cadastrado.`)
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Be the Hero"/>

                <h1>Cadastro novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link className=".back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título"
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    <textarea type="email" 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                    <input 
                        id="valor"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}/>

                    <button type="submit" className="button">Cadastrar</button>
                    <p className="error" id="error-message"></p>
                </form>
            </div>
        </div>
    );
}