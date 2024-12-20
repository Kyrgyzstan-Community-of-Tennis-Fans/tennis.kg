# language: ru

Функционал: Работа админа с партнерами
  Как Админ Сайта я могу создать,
  удалить и отредактировать Партнера

  @admin
  Сценарий: Зайти как админ
    Допустим я нахожусь на странице логина
    И ввожу в поле "Номер телефона" значение "0555 555 555"
    И ввожу в поле "Пароль" значение "123qwe"
    И нажимаю на кнопку "Войти"
    Тогда я должен быть на главной

  @admin-panel
  Сценарий: Перейти в Админ панель
    Допустим я залогинен на сайте
    Тогда я должен быть на главной
    И я нажимаю на иконку пользователя в хедере
    И перехожу на админ панель

  @add-partner
  Сценарий: Добавить партнера
    Допустим я залогинен на сайте
    И я должен быть на админке
    Тогда я нажимаю на кнопку "Добавить Партнера"
    И ввожу в поле "Название Компании Партнера" значение "Тест"
    И ввожу в поле "Url Адрес Партнера" значение "https://www.youtube.com/watch?v=h5EofwRzit0"
    И Загружаю изображения
    И нажимаю на кнопку "Добавить"

  @edit-partner
  Сценарий: Отредактировать партнера
    Допустим я залогинен на сайте
    И я должен быть на админке
    И я вижу карточку партнера "Astar"
    И я нажимаю на кнопку редактирования партнера "Astar"
    И ввожу в поле "Название" значение "Astar test"
    И ввожу в поле "URL Адрес Партнера" значение "https://www.test.com"
    И нажимаю на кнопку "Сохранить"

  @delete-partner
  Сценарий: Удалить партнера
    Допустим я залогинен на сайте
    И я должен быть на админке
    И я вижу карточку партнера "Тест"
    И я нажимаю на кнопку удаления партнера "Тест"
    И нажимаю на кнопку "Удалить"
