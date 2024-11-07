import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import config from './config';
import { News } from './src/model/News';
import { Partner } from './src/model/Partner';
import { Category } from './src/model/Category';
import { User } from './src/model/User';
import { Carousel } from './src/model/Carousel';
import { newsFixtures } from './src/utils/newsFixtures';
import { RatingMember } from './src/model/RatingMember';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('users');
    await db.dropCollection('partners');
    await db.dropCollection('carousels');
    await db.dropCollection('news');
    await db.dropCollection('ratings');
    await db.dropCollection('ratingmembers');
  } catch (e) {
    console.log('Skipping drop...');
  }

  await News.create(newsFixtures);

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

  await RatingMember.create(
    {
      name: 'Leslie Alexander',
      image: 'fixtures/mainRating/man1.jpg',
      gender: 'male',
      place: 1,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Wade Warren',
      image: 'fixtures/mainRating/man2.png',
      gender: 'male',
      place: 2,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Darrell Steward',
      image: 'fixtures/mainRating/man3.png',
      gender: 'male',
      place: 3,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Savannah Nguyen',
      image: 'fixtures/mainRating/man4.png',
      gender: 'male',
      place: 4,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Courtney Henry',
      image: 'fixtures/mainRating/man5.png',
      gender: 'male',
      place: 5,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Potter Harry',
      image: 'fixtures/mainRating/man6.jpg',
      gender: 'male',
      place: 6,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Lucer Gianni',
      image: 'fixtures/mainRating/man7.jpg',
      gender: 'male',
      place: 7,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Collis Bishe',
      image: 'fixtures/mainRating/man8.jpg',
      gender: 'male',
      place: 8,
      ratingType: 'mensTop8',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Ivaan Kashyap',
      image: 'fixtures/mainRating/top3man1.jpg',
      gender: 'male',
      place: 1,
      ratingType: 'mensTop3',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Ariti Rylan',
      image: 'fixtures/mainRating/top3man2.jpg',
      gender: 'male',
      place: 2,
      ratingType: 'mensTop3',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Roberts Henry',
      image: 'fixtures/mainRating/top3man3.jpg',
      gender: 'male',
      place: 3,
      ratingType: 'mensTop3',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Brooklyn Simmons',
      image: 'fixtures/mainRating/woman1.png',
      gender: 'female',
      place: 1,
      ratingType: 'womensTop3',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Jenny Wilson',
      image: 'fixtures/mainRating/woman2.png',
      gender: 'female',
      place: 2,
      ratingType: 'womensTop3',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    },
    {
      name: 'Arlene McCoy',
      image: 'fixtures/mainRating/woman3.png',
      gender: 'female',
      place: 3,
      ratingType: 'womensTop3',
      mensRatingCategoryTop8: 'Masters',
      mensRatingCategoryTop3: 'ProMasters',
      womensRatingCategoryTop3: 'Masters',
    }
  );

  await Carousel.create([
    {
      image: 'fixtures/carousel/photo-1.jpg',
    },
    {
      image: 'fixtures/carousel/photo-2.jpg',
    },
  ]);

  await db.close();
};

run().catch((err) => {
  console.log(err);
});
