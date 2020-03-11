import React from 'react';
import { StatusBar } from 'react-native';

import colors from '~/styles/colors';
import { Container, Background, Input, SubmitButton, Title } from './styles';

export default function ProblemDelivery() {
  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Background />
      <Input autoCapitalize="none" autoCorrect={false} returnKeyType="send" />
      <SubmitButton>
        <Title>Enviar</Title>
      </SubmitButton>
    </Container>
  );
}
