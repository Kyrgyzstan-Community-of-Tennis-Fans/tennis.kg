import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Reward } from '../model/Reward';

export const createReward = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;

    const isRewardExists = await Reward.findOne({ title });

    if (isRewardExists) {
      return res.status(400).send({ error: `Награда ${isRewardExists.title} уже существует!` });
    }

    const reward = await Reward.create({ title, description });

    res.status(201).send(reward);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }

    next(error);
  }
};

export const getRewards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rewards = await Reward.find();

    res.send(rewards);
  } catch (error) {
    next(error);
  }
};

export const deleteReward = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const reward = await Reward.findByIdAndDelete(id);

    if (!reward) {
      res.status(404).send({ error: 'Reward not found' });
    }

    res.send(reward);
  } catch (error) {
    next(error);
  }
};

export const updateReward = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const reward = await Reward.findByIdAndUpdate(id, { title, description }, { new: true, runValidators: true });

    if (!reward) {
      res.status(404).send({ error: 'Reward not found' });
    }

    res.send(reward);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }

    next(error);
  }
};
