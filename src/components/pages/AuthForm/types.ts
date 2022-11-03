import React from 'react';

type AuthFormProps = {

}

type AuthFormDisplayProps = {
  action: 'register' | 'login'
  username: string
  email: string
  password: string
  onUsernameChange: (_event: React.ChangeEvent<HTMLInputElement>) => void
  onEmailChange: (_event: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (_event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}

export type { AuthFormDisplayProps, AuthFormProps };
