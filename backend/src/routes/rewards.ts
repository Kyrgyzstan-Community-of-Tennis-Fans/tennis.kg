import express from 'express';
import { createReward, deleteReward, getRewards, updateReward } from '../controllers/rewards';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const rewardsRouter = express.Router();

rewardsRouter.get('/', auth, permit('admin'), getRewards);
rewardsRouter.post('/', auth, permit('admin'), createReward);
rewardsRouter.delete('/:id', auth, permit('admin'), deleteReward);
rewardsRouter.put('/:id', auth, permit('admin'), updateReward);
