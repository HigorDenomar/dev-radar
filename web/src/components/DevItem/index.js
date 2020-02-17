import React from 'react';

import './styles.css';

function DevItem({dev, deleteDev}) {

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