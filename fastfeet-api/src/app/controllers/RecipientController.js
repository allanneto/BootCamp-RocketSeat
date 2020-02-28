import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientsController {
  async index(req, res) {
    const { q: recipientName, page = 1 } = req.query;

    const recipients = recipientName
      ? await Recipient.findAll({
          where: {
            name: {
              [Op.like]: `${recipientName}%`,
            },
          },
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        })
      : await Recipient.findAll({
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
          limit: 20,
          offset: (page - 1) * 20,
        });

    return res.json(recipients);
  }

  async store(req, res) {
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

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

  // async show(req, res) {
  //   const { id } = req.params;

  //   const recipient = await Recipient.findByPk(id, {
  //     attributes: [
  //       'id',
  //       'name',
  //       'street',
  //       'number',
  //       'compliment',
  //       'state',
  //       'city',
  //       'zip_code',
  //     ],
  //   });

  //   if (!recipient) {
  //     return res.status(400).json({ error: 'Recipient does not exists' });
  //   }

  //   return res.json(recipient);
  // }
}

export default new RecipientsController();
