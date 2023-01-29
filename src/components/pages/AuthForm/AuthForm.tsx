import React, {useState} from 'react';
import {iNotification} from 'react-notifications-component/dist/src/typings';
import {axiosInstance, setAuthToken} from '../../../services/server';
import AuthFormDisplay from './AuthFormDisplay';
import {addNotification, loginFailedNotification, systemErrorNotification} from '../../../services/notification';

type AuthFormProps = {
  action: 'register' | 'login'
  onTokenAcquisition: Function
}

export default function AuthForm({ action, onTokenAcquisition }: AuthFormProps) {
  const [password, setPassword] = useState('');
  const [email, setMail] = useState('');
  const [username, setUsername] = useState('');

  const isFormValid = password.length > 0 && email.length > 0 && (action === 'register' ? username.length > 0 : true);

  return (
    <AuthFormDisplay
      action={action}
      username={username}
      email={email}
      password={password}
      onUsernameChange={(event) => setUsername(event.target.value)}
      onEmailChange={(event) => setMail(event.target.value)}
      onPasswordChange={(event) => setPassword(event.target.value)}
      onSubmit={sendData}
      isFormValid={isFormValid}
    />
  );

  function sendData() {
    if (action === 'register') {
      axiosInstance.post('/users/register', {
        email,
        password,
        username,
      }).then(({ data }) => {
        const token = data.token;
        if (token) {
          login();
        }
      })
        .catch((error) => {
          const { data: { errors } } = error.response;
          errors.forEach(({ message }: {message: string}) => {
            const notification: iNotification = {
              ...systemErrorNotification,
              message: `Une erreur est survenue lors de l'inscription : ${message}.`,
            };
            addNotification(notification);
          });
        });
    } else if (action === 'login') {
      login();
    }
  }

  function login() {
    axiosInstance.post('/users/login', {
      email,
      password,
    }).then(({ data }) => {
      const token = data.token;
      if (token) {
        setAuthToken(token);
        onTokenAcquisition(token, true);
      }
    })
      .catch((error) => {
        console.log(error);
        addNotification(loginFailedNotification);
      });
  }
}
