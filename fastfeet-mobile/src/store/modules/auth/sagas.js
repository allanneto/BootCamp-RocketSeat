import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { parseISO, format } from 'date-fns';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliveryman/${id}`);

    yield put(signInSuccess(id), {
      name: response.data.name,
      email: response.data.email,
      created_at: format(parseISO(response.data.created_at), 'dd/MM/yyyy'),
      avatar: response.data.avatar,
    });
  } catch (err) {
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
