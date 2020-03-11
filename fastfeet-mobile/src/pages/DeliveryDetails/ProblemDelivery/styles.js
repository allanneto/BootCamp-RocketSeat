import styled from 'styled-components/native';

import Button from '~/components/Button';
import colors from '~/styles/colors';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: true,
})`
  flex: 1;
  position: relative;
  background: #fff;
`;

export const Background = styled.View`
  background: ${colors.primary};
  height: 155px;
`;

export const Input = styled.TextInput.attrs({
  textAlignVertical: 'top',
  value: 'Inclua aqui o problema que ocorreu na entrega.',
})`
  border-radius: 4px;
  /* box-shadow:
  background-color: #fff;
  color: #999999;
   */
`;

export const SubmitButton = styled(Button)`
  background: ${colors.primary};
  margin: 80px 20px 0px 20px;
`;

export const Title = styled.Text`
  color: #fff;
`;
