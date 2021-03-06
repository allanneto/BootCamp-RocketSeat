import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { SaveButton, BackButton } from '~/components/Button';
import { SimpleInput, MaskInput } from '~/components/Form';
import HeaderForm from '~/components/HeaderForm';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function RecipientForm({ match }) {
	const { id } = match.params;
	const formRef = useRef();

	useEffect(() => {
		async function loadInitialData() {
			if (id) {
				const response = await api.get(`/recipient/${id}`);

				formRef.current.setData(response.data);
			}
		}
		loadInitialData();
	}, [id]);

	async function handleSubmit(data, { reset }) {
		formRef.current.setErrors({});

		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('O nome é obrigatório'),
				street: Yup.string().required('A rua é obrigatória'),
				number: Yup.string().required('O número é obrigatório'),
				compliment: Yup.string().notRequired(),
				city: Yup.string().required('A cidade é obrigatória'),
				state: Yup.string()
					.required('O estado é obrigatório, dois caracteres')
					.max(2),
				postal_code: Yup.string().required('O CEP é obrigatório'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			if (id) {
				await api.put(`/recipient/${id}`, {
					name: data.name,
					street: data.street,
					number: data.number,
					compliment: data?.compliment,
					state: data.state,
					city: data.city,
					postal_code: data.postal_code,
				});
				toast.success('Destinatário editado com sucesso!');
				history.push('/recipient');
			} else {
				await api.post('/recipient', {
					name: data.name,
					street: data.street,
					number: data.number,
					compliment: data?.compliment,
					state: data.state,
					city: data.city,
					postal_code: data.postal_code,
				});
				toast.success('Destinatário criado com sucesso!');
				history.push('/recipient');
			}

			reset();
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errorMessages = {};

				err.inner.forEach(error => {
					errorMessages[error.path] = error.message;
				});

				formRef.current.setErrors(errorMessages);
			}
		}
	}

	return (
		<Container>
			<Content>
				<HeaderForm title="Cadastro de destinatário">
					<BackButton />
					<SaveButton action={() => formRef.current.submitForm()} />
				</HeaderForm>

				<UnForm ref={formRef} onSubmit={handleSubmit}>
					<SimpleInput
						label="Nome"
						name="name"
						type="text"
						placeholder="Nome do destinatário"
					/>
					<div>
						<SimpleInput
							label="Rua"
							name="street"
							type="text"
							placeholder="Rua do destinatário"
						/>
						<SimpleInput
							label="Número"
							name="number"
							type="number"
							placeholder="Número da casa"
						/>
						<SimpleInput label="Complemento" name="compliment" type="text" />
					</div>
					<div>
						<SimpleInput
							label="Cidade"
							name="city"
							type="text"
							placeholder="Cidade do destinatário"
						/>
						<SimpleInput
							label="Estado"
							name="state"
							type="text"
							placeholder="Estado do destinatário"
						/>
						<MaskInput
							label="CEP"
							name="postal_code"
							mask="99999-999"
							maskPlaceholder={null}
							placeholder="_____-___"
							onKeyPress={e =>
								e.key === 'Enter' ? formRef.current.submitForm() : null
							}
						/>
					</div>
				</UnForm>
			</Content>
		</Container>
	);
}

RecipientForm.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};
