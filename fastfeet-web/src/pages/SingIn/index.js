import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import SimpleButton from '~/components/Button/SimpleButton';

const schema = Yup.object().shape({
	email: Yup.string()
		.email('Insira um e-mail válido')
		.required('O e-mail é obrigatório'),
	password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
	const loading = false;
	function handleSubmit({ email, password }) {
		console.tron.log(email, password);
	}

	return (
		<>
			<img src={logo} alt="FastFeet" />

			<Form schema={schema} onSubmit={handleSubmit}>
				<label>SEU E-MAIL</label>
				<Input name="email" type="email" placeholder="exemplo@email.com" />
				<label>SUA SENHA</label>
				<Input name="password" type="password" placeholder="*************" />

				<SimpleButton type="submit">
					{loading ? 'Carregando...' : 'Entrar no sistema'}
				</SimpleButton>
			</Form>
		</>
	);
}
