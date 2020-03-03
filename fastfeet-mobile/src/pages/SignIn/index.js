import React from 'react';
import { Image, StatusBar, Text } from 'react-native';

import { Container } from './styles';
import colors from '../../styles/colors';

export default function SignIn() {
  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} />
      <Text> Olá mundo! </Text>
    </Container>
  );
}
