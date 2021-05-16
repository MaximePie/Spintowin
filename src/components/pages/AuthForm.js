import React, {useState} from 'react';
import {axiosInstance} from "../../server";

export default function AuthForm({action, onTokenAcquisition}) {

  const [password, setPassword] = useState('');
  const [email, setMail] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className="AuthForm">
      <label>
        Email :
        <input type="text" value={email} onChange={(event) => setMail(event.target.value)}/>
      </label>
      <label>
        Mot de passe :
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </label>
      {action === 'register' && (
        <>
          <label>
            Nom d'utilisateur
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
          </label>
        </>
      )}
      <button onClick={sendData}>Se connecter ou s'enregistrer</button>
    </div>
  );

  function sendData() {
    if (action === 'register') {
      axiosInstance.post('/users/register', {
        email,
        password,
        username
      }).then(({data}) => {
        const token = data.token;
        if (token) {
          onTokenAcquisition(token, true);
        }
        else if (data.message) {
          console.log(data.message);
        }
      });
    }
    else if (action === 'login') {
      axiosInstance.post('/users/login', {
        email,
        password,
      }).then(({data}) => {
        const token = data.token;
        if (token) {
          onTokenAcquisition(token, true);
        }
        else if (data.error) {
          console.log(data.error);
        }
      });
    }
  }
}
