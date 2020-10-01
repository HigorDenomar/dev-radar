import React from 'react';

import './styles.css';

// dev: é um objeto contendo os dados do Desenvolvedor;
//deleteDev: é a função de deletar um desenvolvedor, declarada no App.js.
function DevItem({dev, deleteDev}) {

    // Renderiza o Dev
    return (
        <li className="dev-item">
            <header>
                <div id="infos">
                    <img src={dev.avatar_url} alt={dev.name}/>
                    <div className="user-info">
                        <strong>{dev.name}</strong>
                        <span>{dev.techs.join(', ')}</span>
                    </div>
                </div>

                {/* Icone para deletar Dev */}
                <div className="icons">
                    <i
                        class="material-icons"
                        onClick={()=>{
                            deleteDev(dev._id)
                        }}
                    >delete</i>
                </div>
            </header>

            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`} target="_blank">Acessar perfil no Github</a>
        </li>
    );
}

export default DevItem;