import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { parseISO, format } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

import NamePhoto from '~/components/NamePhoto';

import {
  Container,
  Profile,
  Action,
  Avatar,
  TitleProfile,
  Welcome,
  Name,
  Menu,
  TitleMenu,
  Options,
  Option,
  List,
} from './styles';

import colors from '~/styles/colors';
import { Text } from 'react-native';

export default function Dashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [typeDeliveries, setTypeDeliveries] = useState('PENDENTES');

  const dispatch = useDispatch();
  const profile = useSelector(state => state?.user?.profile);
  const auth = useSelector(state => state.auth);

  function handleLogout() {
    dispatch(signOut());
  }

  function handlePending() {
    setTypeDeliveries('PENDENTES');
  }

  function handleDelivered() {
    setTypeDeliveries('ENTREGUES');
  }

  useEffect(() => {
    async function loadDeliveries() {
      if (!auth.id) return;

      try {
        const response =
          typeDeliveries === 'PENDENTES'
            ? await api.get(`/deliveryman/${auth.id}`)
            : await api.get(`/deliveryman/${auth.id}/deliveries`);

        // const data = response.data.map(delivery => ({
        //   ...delivery,
        //   start_date_formated: delivery.start_date
        //     ? format(parseISO(delivery?.start_date), 'dd/MM/yyyy')
        //     : '--/--/--',
        // }));
        setDeliveries(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadDeliveries();
  }, [auth.id, typeDeliveries]);

  return (
    <Container>
      <Profile>
        <Action>
          {profile?.avatar ? (
            <Avatar source={{ uri: profile?.avatar?.url }} />
          ) : (
            <>{profile?.name && <NamePhoto name={profile?.name} />}</>
          )}
        </Action>
        <TitleProfile>
          <Welcome>Bem vindo de volta,</Welcome>
          <Name>{profile?.name}</Name>
        </TitleProfile>
        <Action>
          <Icon
            onPress={handleLogout}
            name="exit-to-app"
            color={colors.danger}
            size={25}
          />
        </Action>
      </Profile>

      <Menu>
        <TitleMenu>Entregas</TitleMenu>
        <Options>
          <Option
            style={{
              marginRight: 15,
            }}
            onPress={handlePending}
            selected={typeDeliveries === 'PENDENTES'}
          >
            Pendentes
          </Option>
          <Option
            selected={typeDeliveries === 'ENTREGUES'}
            onPress={handleDelivered}
          >
            Entregues
          </Option>
        </Options>
      </Menu>

      <List
        data={deliveries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Delivery data={item} />}
      />
    </Container>
  );
}
