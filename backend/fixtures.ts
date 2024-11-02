import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import config from './config';
import { News } from './src/model/News';
import { Partner } from './src/model/Partner';
import { Category } from './src/model/Category';
import { User } from './src/model/User';
import { Carousel } from './src/model/Carousel';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('users');
    await db.dropCollection('partners');
    await db.dropCollection('carousels');
    // await db.dropCollection('news');
  } catch (e) {
    console.log('Skipping drop...');
  }

  await News.create(
    {
      title: 'Winter Gold Cup 2021',
      subtitle: 'Новогодний турнир',
      content:
        'Товарищи! консультация с широким активом выполнять важные задания по разработке дальнейших направлений развития. ' +
        'Равным образом консультация с широким активом в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям.\n' +
        'Разнообразный и богатый опыт укрепление и развитие структуры позволяет выполнять важные задания по разработке системы обучения кадров, ' +
        'соответствует насущным потребностям. Задача организации, в особенности же дальнейшее развитие различных форм деятельности позволяет оценить значение новых предложений. ' +
        'Идейные соображения высшего порядка, а также укрепление и развитие структуры способствует подготовки и реализации модели развития.\n' +
        'Повседневная практика показывает, что укрепление и развитие структуры позволяет выполнять важные задания по разработке новых предложений. ' +
        'Таким образом реализация намеченных плановых заданий способствует подготовки и реализации новых предложений. ' +
        'Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации форм развития. ' +
        'Товарищи! рамки и место обучения кадров требуют от нас анализа дальнейших направлений развития.\n' +
        'Задача организации, в особенности же консультация с широким активом требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. ' +
        'Не следует, однако забывать, что новая модель организационной деятельности представляет собой интересный эксперимент проверки системы обучения кадров, ' +
        'соответствует насущным потребностям. Товарищи! рамки и место обучения кадров требуют определения и уточнения существенных финансовых и административных условий. С другой стороны начало повседневной работы по формированию позиции позволяет оценить значение существенных финансовых и административных условий. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения форм развития. Товарищи! рамки и место обучения кадров способствует подготовки и реализации форм развития.\n' +
        'Таким образом консультация с широким активом в значительной степени обуславливает создание соответствующий условий активизации. ' +
        'Задача организации, в особенности же начало повседневной работы по формированию позиции позволяет оценить значение соответствующий условий активизации. ' +
        'Не следует, однако забывать, что начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке систем массового участия. ' +
        'Товарищи! укрепление и развитие структуры влечет за собой процесс внедрения и модернизации дальнейших направлений развития. ' +
        'Таким образом укрепление и развитие структуры позволяет оценить значение направлений прогрессивного развития.',
      createdAt: '2024-11-02T16:15:36.700+00:00',
      updatedAt: '2024-11-03T16:15:36.700+00:00',
      newsCover: 'fixtures/news/first.png',
      images: [
        'fixtures/news/newsInner1.png',
        'fixtures/news/newsInner2.png',
        'fixtures/news/newsInner3.png',
        'fixtures/news/first.png',
        'fixtures/news/second.png',
        'fixtures/news/third.png',
      ],
    },
    {
      title: 'Spring Silver Cup 2021',
      subtitle: 'Весенний турнир',
      content:
        'Дорогие товарищи! Важные задания по разработке системы обучения позволяют выполнять актуальные задачи. ' +
        'Практика показывает, что укрепление структуры способствует достижению поставленных целей. ' +
        'Консультация с активом дает возможность для определения новых путей развития. ' +
        'Анализ задач требует внедрения инноваций для роста и развития.',
      createdAt: '2024-10-27T12:30:45.700+00:00',
      updatedAt: '2024-10-27T15:45:30.800+00:00',
      newsCover: 'fixtures/news/second.png',
      images: ['fixtures/news/newsInner1.png', 'fixtures/news/newsInner2.png'],
    },
    {
      title: 'Autumn Bronze Cup 2022',
      subtitle: 'Осенний турнир',
      content:
        'Приветствую, товарищи! Консультации с активом помогают определить пути совершенствования структуры. ' +
        'Значение новых предложений оценено и принято на вооружение для будущего роста. ' +
        'Начало работы над новыми проектами способствует реализации поставленных задач. ' +
        'Особое внимание уделяется анализу текущих процессов и их оптимизации.',
      createdAt: '2024-11-01T09:20:15.500+00:00',
      updatedAt: '2024-11-02T11:35:40.600+00:00',
      newsCover: 'fixtures/news/third.png',
      images: [
        'fixtures/news/newsInner2.png',
        'fixtures/news/newsInner3.png',
        'fixtures/news/first.png',
        'fixtures/news/second.png',
      ],
    },
    {
      title: 'Winter Silver Cup 2023',
      subtitle: 'Новогодний чемпионат',
      content:
        'Коллеги! Начало новой программы позволяет достигать поставленных целей и задач. ' +
        'Консультация с активом выявляет направления улучшения качества обучения. ' +
        'Организационная деятельность требует особого внимания для решения новых задач. ' +
        'Практика показывает, что обновление структуры способствует повышению эффективности.',
      createdAt: '2024-10-29T08:15:22.300+00:00',
      updatedAt: '2024-10-30T10:50:18.400+00:00',
      newsCover: 'fixtures/news/fourth.png',
      images: [],
    }
  );

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
