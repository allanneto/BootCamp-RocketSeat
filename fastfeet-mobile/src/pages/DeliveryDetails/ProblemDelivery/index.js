import React, { useState } from 'react';
import { Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  Form,
  Input,
  SubmitButton,
} from './styles';

export default function ProblemDelivery() {
  const route = useRoute();
  const navigation = useNavigation();
  const { delivery } = route.params;
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      if (description === '') {
        Alert.alert('A mensagem precisa ser preenchida.');
        return;
      }

      await api.post(`/delivery/${delivery.id}/problems`, { description });
      Alert.alert(
        'Sucesso',
        `Problema cadastrado com sucesso, Delivery #${delivery.id}`
      );

      navigation.navigate('Entregas');
    } catch (error) {
      Alert.alert(
        'Erro',
        `Erro ao cadastrar problema para a encomenda #${delivery.id}`
      );
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <Form>
          <Input value={description} onChangeText={setDescription} />
          <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}
