import React, {useState} from 'react';
import {axiosInstance} from "../../server";
import InputGroup from "../atoms/InputGroup"
import {Link} from "react-router-dom";

export default function AuthForm({action, onTokenAcquisition}) {

  const [password, setPassword] = useState('');
  const [email, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [hasAdsEnabled, setAdsState] = useState(false);

  return (
    <div className="AuthForm-container">

      <div className="AuthForm">
        <h3>Bienvenue !</h3>
        {action === 'register' && (
          <>
            <div className="AuthForm__field">
              <label className="AuthForm__label">
                Nom d'utilisateur
              </label>
              <InputGroup
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="AuthForm__input"
                icon="user"
                placeholder="Entrez votre castobriquet"
              />
            </div>
          </>
        )}
        <div className="AuthForm__field">
          <label className="AuthForm__label">
            Email
          </label>
          <InputGroup
            type="text"
            value={email}
            onChange={(event) => setMail(event.target.value)}
            className="AuthForm__input"
            icon="envelope"
            placeholder="Entrez votre e-mail"
          />
        </div>
        <div className="AuthForm__field">
          <label className="AuthForm__label">
            Mot de passe
          </label>
          <InputGroup
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="AuthForm__input"
            icon="lock"
            isIconSolid
            placeholder="Entrez votre mot de passe"
          />
        </div>
        {action === 'register' && (
          <>
            <div className="AuthForm__field AuthForm__field--checkbox">
              <input
                type="checkbox"
                value={hasAdsEnabled}
                onChange={(event) => setAdsState(event.target.checked)}
                className="AuthForm__input"
              />
              <label className="AuthForm__label">
                Je souhaite contribuer gratuitement en activant les publicités
              </label>
            </div>
          </>
        )}
        <button onClick={sendData} className="AuthForm__action">
          {action === 'register' ? "S'enregistrer" : 'Se connecter'}
        </button>
        {action === "register" && (
          <div className="AuthForm__redirection">
            <p>Vous avez déjà un compte ?</p>
            <Link to="/login">Connectez-vous</Link>
          </div>
        )}
        {action === "login" && (
          <div className="AuthForm__redirection">
            <p>Vous n'avez pas de compte ?</p>
            <Link to="/register">Créez un compte</Link>
          </div>
        )}
      </div>
    </div>
  );

  function sendData() {
    if (action === 'register') {
      axiosInstance.post('/users/register', {
        email,
        password,
        username,
        hasAdsEnabled,
      }).then(({data}) => {
        const token = data.token;
        if (token) {
          onTokenAcquisition(token, true);
        } else if (data.message) {
        }
      });
    } else if (action === 'login') {
      axiosInstance.post('/users/login', {
        email,
        password,
      }).then(({data}) => {
        const token = data.token;
        if (token) {
          onTokenAcquisition(token, true);
        } else if (data.error) {
        }
      });
    }
  }
}
