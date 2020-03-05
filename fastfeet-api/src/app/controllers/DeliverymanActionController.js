import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliverymanActionController {
  async index(req, res) {
    // const { ended = 'true' } = req.params;
    const { id } = req.params;

    const delivermanExists = await Deliveryman.findByPk(id);

    if (!delivermanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        signature_id: { [Op.not]: null },
        canceled_at: null,
        // end_date: ended === true ? { [Op.not]: null } : null,
      },
      attributes: [
        'id',
        'deliveryman_id',
        'product',
        'status',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliverymanActionController();
