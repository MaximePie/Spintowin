import React from 'react';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  Container, StyledForm, Field, Label, Action, Redirection,
} from './styles';
import { AuthFormDisplayProps } from './types';
import InputGroup from '../../atoms/InputGroup/InputGroup';

export default function AuthFormDisplay({
  action,
  username,
  email,
  password,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isFormValid,
}: AuthFormDisplayProps) {
  return (
    <Container>
      <StyledForm>
        <h3>Bienvenue !</h3>
        {action === 'register' && (
        <Field>
          <Label>
            Nom d&apos;utilisateur
            <InputGroup
              type="text"
              value={username}
              onChange={onUsernameChange}
              className="AuthForm__input"
              icon={faUser}
              placeholder="Entrez votre castobriquet"
            />
          </Label>
        </Field>
        )}
        <Field>
          <Label>
            Email
            <InputGroup
              type="text"
              value={email}
              onChange={onEmailChange}
              className="AuthForm__input"
              icon={faEnvelope}
              placeholder="Entrez votre e-mail"
            />
          </Label>
        </Field>
        <Field>
          <Label>
            Mot de passe
            <InputGroup
              type="password"
              value={password}
              onChange={onPasswordChange}
              className="AuthForm__input"
              icon={faLock}
              isIconSolid
              placeholder="Entrez votre mot de passe"
            />
          </Label>
        </Field>
        <Action
          type="button"
          onClick={onSubmit}
          className="AuthForm__action"
          disabled={!isFormValid}
        >
          {action === 'register' ? "S'enregistrer" : 'Se connecter'}
        </Action>
        {action === 'register' && (
        <Redirection className="AuthForm__redirection">
          <p>Vous avez déjà un compte ?</p>
          <Link to="/login">Connectez-vous</Link>
        </Redirection>
        )}
        {action === 'login' && (
        <Redirection>
          <p>Vous n&apos;avez pas de compte ?</p>
          <Link to="/register">Créez un compte</Link>
        </Redirection>
        )}
      </StyledForm>
    </Container>
  );
}
