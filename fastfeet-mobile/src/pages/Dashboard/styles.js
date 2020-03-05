import styled from 'styled-components/native';

import Text from '~/components/Text';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Profile = styled.View`
  margin-top: 20.5px;
  flex-direction: row;
`;

export const Action = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const TitleProfile = styled.View`
  flex: 3;
`;

export const Welcome = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-size: 16px;
  color: #666666;
  margin: 0 0 0 12px;
`;

export const Name = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-size: 29px;
  font-weight: bold;
  color: #444;
  margin: 0 0 0 12px;
`;
