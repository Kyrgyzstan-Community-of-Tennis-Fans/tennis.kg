import mongoose from 'mongoose';
import config from './config';
import { Partner } from './model/Partner';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('partners');
  } catch (error) {
    console.log('skipping drop..');
  }

  await Partner.create(
    {
      name: 'Knauf',
      image: 'logo/Knauf.svg',
      url: 'https://www.knauf.com',
    },
    {
      name: 'Argon',
      image: 'logo/Argon.svg',
      url: 'https://www.argon.com',
    },
    {
      name: 'Astar',
      image: 'logo/astar.svg',
      url: 'https://www.astar.com',
    },
    {
      name: 'T-club',
      image: 'logo/t-club.svg',
      url: 'https://www.t-club.com',
    },
    {
      name: 'Babolat',
      image: 'logo/babolat.svg',
      url: 'https://www.babolat.com',
    },
    {
      name: 'Artium',
      image: 'logo/Artium.svg',
      url: 'https://www.artium.com',
    }
  );
};
