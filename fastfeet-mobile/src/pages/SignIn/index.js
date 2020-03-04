import React from 'react';
import { Image } from 'react-native';

import { Container, Input, FormInput, SubmitButton } from './styles';
import logo from '~/assets/fastfeet-logo-white.png';

export default function SignIn() {
  return (
    <Container>
      <Image source={logo} />
      <Input
        name="id"
        keyboardType="number-pad"
        placeholder="Informe seu ID no cadastro"
        autoCorrect={false}
        returnKeyType="send"
        autoCapitalize="none"
      />
      <SubmitButton>Entrar no sistema</SubmitButton>
    </Container>
  );
}
