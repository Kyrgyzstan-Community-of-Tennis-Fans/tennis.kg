# language: ru

Функционал: Управление каруселью на главной странице
  Как администратор сайта
  Я хочу иметь возможность добавлять, удалять и редактировать файлы в карусели
  Чтобы поддерживать актуальность и привлекательность контента на главной странице.

  @add-image-in-carousel
    Сценарий: Добавить в карусель видео
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку в админ пенели "Карусель"
    Тогда я кликаю на кнопку в админ пенели "Добавить файл"
    И я загружаю файл "public/filesCarousel/testImage.png"
    Когда я кликаю на кнопку с инконкой в котором есть дата "add-file-in-carousel"
    И если я вижу текст "Файл успешно выложен" то тест успешно завершен

  @delete-image-in-carousel
  Сценарий: Удалить изображения из карусели
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку в админ пенели "Карусель"
    Когда я кликаю на кнопку с инконкой в котором есть дата "delete-file-in-carousel"
    Тогда я кликаю на кнопку в админ пенели "Удалить"
    И если я вижу текст "Файл успешно удален" то тест успешно завершен

  @update-image-in-carousel
  Сценарий: Редактировать изображения из карусели
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку в админ пенели "Карусель"
    Когда я кликаю на кнопку с инконкой в котором есть дата "change-file-in-carousel"
    И я загружаю файл "public/filesCarousel/testImage.png"
    Когда я кликаю на кнопку с инконкой в котором есть дата "update-file-in-carousel"
    И если я вижу текст "Файл успешно обновлен" то тест успешно завершен


  @add-video-in-carousel
  Сценарий: Добавить в карусель изображения
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку в админ пенели "Карусель"
    Тогда я кликаю на кнопку в админ пенели "Добавить файл"
    И я загружаю файл "public/filesCarousel/testVideo.MP4"
    Когда я кликаю на кнопку с инконкой в котором есть дата "add-file-in-carousel"
    И если я вижу текст "Файл успешно выложен" то тест успешно завершен
