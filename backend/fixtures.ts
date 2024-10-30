import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import { Category } from './model/Category';
import { Partner } from './model/Partner';
import { User } from './model/User';
import { Carousel } from './model/Carousel';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('users');
    await db.dropCollection('partners');
    await db.dropCollection('carousel');
  } catch (e) {
    console.log('Skipping drop...');
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

  const [masters, proMasters, futures] = await Category.create(
    {
      name: 'Masters',
    },
    {
      name: 'ProMasters',
    },
    {
      name: 'Futures',
    }
  );

  await User.create(
    {
      category: masters._id,
      fullName: 'John Doe',
      telephone: '0555 555 555',
      dateOfBirth: '15.10.2007',
      gender: 'male',
      role: 'admin',
      password: '123qwe',
      email: 'john@gmail.com',
      token: randomUUID(),
    },
    {
      category: proMasters._id,
      fullName: 'Alice Doe',
      telephone: '0999 999 999',
      dateOfBirth: '15.12.2004',
      gender: 'female',
      password: '123qwe',
      email: 'alice@gmail.com',
      token: randomUUID(),
    }
  );

  await Carousel.create([{
    image:'fixtures/carousel/photo-1.jpg',
  },{
    image:'fixtures/carousel/photo-2.jpg',
  },]);

  await db.close();
};

run().catch(console.error);
