import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import { Category } from './model/Category';
import { User } from './model/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }

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

  await db.close();
};

run().catch(console.error);
