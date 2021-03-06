import Queue from '../../lib/Queue';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class ProblemsAdminController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const problems = await DeliveryProblem.findAll({
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.status(200).json(problems);
  }

  async update(req, res) {
    const { problem_id } = req.params;

    const problem = await DeliveryProblem.findByPk(problem_id);
    if (!problem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    const delivery = await Delivery.findByPk(problem.delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery alredy canceled' });
    }

    await delivery.update({ canceled_at: new Date(), status: 'CANCELADA' });
    // await delivery.reload({
    //   attributes: ['id', 'product', 'start_date', 'end_date'],
    //   include: [
    //     {
    //       model: Recipient,
    //       as: 'recipient',
    //       attributes: [
    //         'id',
    //         'name',
    //         'street',
    //         'number',
    //         'postal_code',
    //         'compliment',
    //         'state',
    //         'city',
    //       ],
    //     },
    //     {
    //       model: Deliveryman,
    //       as: 'deliveryman',
    //       attributes: ['id', 'name', 'email'],
    //       include: [
    //         {
    //           model: File,
    //           as: 'avatar',
    //           attributes: ['name', 'path', 'url'],
    //         },
    //       ],
    //     },
    //     {
    //       model: File,
    //       as: 'signature',
    //       attributes: ['name', 'path', 'url'],
    //     },
    //   ],
    // });

    await Queue.add(CancelDeliveryMail.key, { delivery });

    return res.status(200).json(delivery);
  }
}

export default new ProblemsAdminController();
