import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliverymanActionController {
  async index(req, res) {
    const { ended = 'true' } = req.params;
    const { id } = req.params;

    const delivermanExists = await Deliveryman.findByPk(id);

    if (!delivermanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: ended === true ? { [Op.not]: null } : null,
      },
      order: ['end_date', 'start_date', 'id'],
    });

    return res.json(deliveries);
  }
}

export default new DeliverymanActionController();
