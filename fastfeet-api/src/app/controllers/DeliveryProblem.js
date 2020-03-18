import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

class ProblemsAdminController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const problems = await DeliveryProblem.findAll({
      limit: 5,
      offset: (page - 1) * 5,
    });

    const idsWithProblems = problems.map(p => p.delivery_id);

    const deliveries = await Delivery.findAll({
      where: {
        id: {
          [Op.in]: idsWithProblems,
        },
      },
      attributes: ['id', 'product', 'status', 'start_date', 'end_date'],
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'postal_code',
            'compliment',
            'state',
            'city',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.status(200).json(deliveries);
  }
}

export default new ProblemsAdminController();
