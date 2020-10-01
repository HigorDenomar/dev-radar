import React, {useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


function App() {

  const [devs, setDevs] = useState([]);

  // Busca todos os Devs do banco de dados ao iniciar a aplicaçãos
  useEffect(() => {
    async function loadDev() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDev();
  }, []);

  // Cria um novo Dev e o adiciona ao array de devs (pra mostrar em tela).
  async function handleAddDev(data) {

    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  // Deleta um Dev no banco e remove do array devs
  async function deleteDev(_id) {
    await api.delete(`/devs/${_id}`);
    setDevs(devs.filter(dev => dev._id !== _id));
  }

  return (
    <div id="app">
      {/* Mostra o formulário para cadastrar um novo Dev */}
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        {/* Exibe todos os Devs cadastrados */}
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} deleteDev={deleteDev}/>
          ))}
          
        </ul>
      </main>
    </div>
    
  );
}

export default App;
