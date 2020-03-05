import React from 'react';

import {
  Container,
  Profile,
  TitleProfile,
  Welcome,
  Name,
  Action,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '~/styles/colors';

export default function Dashboard() {
  return (
    <Container>
      <Profile>
        <Action></Action>
        <TitleProfile>
          <Welcome>Bem vindo de volta,</Welcome>
          <Name>Tiago</Name>
        </TitleProfile>
        <Action>
          <Icon name="exit-to-app" color={colors.danger} size={25} />
        </Action>
      </Profile>
    </Container>
  );
}
