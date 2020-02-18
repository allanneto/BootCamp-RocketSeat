import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientsController {
  // async index(req, res) {
  //   const { page = 1 } = req.query;

  //   const recipients = await Recipient.findAll({
  //     attributes: [
  //       'name',
  //       'street',
  //       'number',
  //       'complement',
  //       'state',
  //       'city',
  //       'postal_code',
  //     ],
  //     limit: 20,
  //     offset: (page - 1) * 20,
  //   });

  //   return res.json(recipients);
  // }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().notRequired(),
      compliment: Yup.string().notRequired(),
      state: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
      postal_code: Yup.string()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().notRequired(),
      complement: Yup.string().notRequired(),
      state: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
      postal_code: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' });
    }

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  // async delete(req, res) {
  //   const { id } = req.params;

  //   const recipients = await Recipient.destroy({ where: { id } });

  //   return res.json({ recipients });
  // }
}

export default new RecipientsController();
