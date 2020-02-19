import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json({ deliverymans });
  }

  async store(req, res) {
    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });
    if (deliverymanExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.status(200).json(deliveryman);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    if (!deliveryman) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json(deliveryman);
  }

  async update(req, res) {
    const { email } = req.body;
    const { id } = req.params;
    if (email) {
      const emailExists = await Deliveryman.findOne({ where: { email } });

      if (emailExists && emailExists.id !== id) {
        return res.status(400).json({ error: 'Email alredy registered' });
      }
    }

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'User not found' });
    }

    deliveryman.update(req.body);
    const { id: newId, name, email: newEmail, avatar_id } = deliveryman;

    return res.status(200).json({
      id: newId,
      name,
      email: newEmail,
      avatar_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'User not found' });
    }

    await deliveryman.destroy();

    return res.status(200).json(deliveryman);
  }
}

export default new DeliverymanController();
