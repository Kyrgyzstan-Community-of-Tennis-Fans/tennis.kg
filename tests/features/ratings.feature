# language: ru
Функционал: Рейтинги

  Сценарий: Просмотр рейтинга
    Допустим я нахожусь на странице рейтингов
    Когда я нажимаю на аккордеон рейтинга "Мужской рейтинг"
    Тогда открывается список рейтингов по годам и месяцам
    И я вижу список событий, связанных с выбранным рейтингом
    И я вижу кнопку 'Открыть рейтинг' с атрибутом href, указывающим на Google Docs

  Сценарий: Cоздание рейтинга
    Допустим я нахожусь на странице логина
    Когда я ввожу "0555555555" в поле "Номер телефона"
    И я ввожу "123qwe" в поле "Пароль"
    И нажимаю на кнопку "Войти"
    Тогда я вижу главную страницу
    Когда я перехожу в "Панель администратора" через меню профиля
    И открываю вкладку "Рейтинги"
    И нажимаю на кнопку "Добавить рейтинг"
    И в селекте "Месяц" выбираю "Январь"
    И в селекте "Раздел" выбираю "Мужской"
    И ввожу "2020" в поле "Год"
    И нажимаю на кнопку "Добавить"
    Тогда я вижу уведомление "Рейтинг успешно добавлен"

  Сценарий: Добавить событие в рейтинг
    Допустим я нахожусь на странице логина
    Когда я ввожу "0555555555" в поле "Номер телефона"
    И я ввожу "123qwe" в поле "Пароль"
    И нажимаю на кнопку "Войти"
    Тогда я вижу главную страницу
    Когда я перехожу в "Панель администратора" через меню профиля
    И открываю вкладку "Рейтинги"
    И нажимаю на кнопку "Добавить событие"
    И в селекте "Категория" выбираю "ProMasters"
    И в селекте "Рейтинг" выбираю "Январь 2024"
    И ввожу "https://www.youtube.com/" в поле "Ссылка"
    И нажимаю на кнопку "Сохранить"
    Тогда я вижу уведомление "Событие успешно добавлено"

  Сценарий: Редактировать событие
    Допустим я нахожусь на странице логина
    Когда я ввожу "0555555555" в поле "Номер телефона"
    И я ввожу "123qwe" в поле "Пароль"
    И нажимаю на кнопку "Войти"
    Тогда я вижу главную страницу
    Когда я перехожу в "Панель администратора" через меню профиля
    И открываю вкладку "Рейтинги"
    Когда я нажимаю на аккордеон рейтинга "Женский рейтинг"
    Тогда открывается список рейтингов по годам и месяцам
    И нажимаю на кнопку редактировать у события
    И в селекте "Категория" выбираю "ProMasters"
    И в селекте "Рейтинг" выбираю "Январь 2024"
    И ввожу "https://www.youtube.com/" в поле "Ссылка"
    И нажимаю на кнопку "Сохранить"
    Тогда я вижу уведомление "Событие успешно отредактировано"

  Сценарий: Удалить событие
    Допустим я нахожусь на странице логина
    Когда я ввожу "0555555555" в поле "Номер телефона"
    И я ввожу "123qwe" в поле "Пароль"
    И нажимаю на кнопку "Войти"
    Тогда я вижу главную страницу
    Когда я перехожу в "Панель администратора" через меню профиля
    И открываю вкладку "Рейтинги"
    Когда я нажимаю на аккордеон рейтинга "Женский рейтинг"
    Тогда открывается список рейтингов по годам и месяцам
    И нажимаю на кнопку удалить у события
    Тогда я вижу попап с вопросом "Вы действительно хотите?"
    И нажимаю на кнопку "Удалить"
    Тогда я вижу уведомление "Событие успешно удалено"

  Сценарий: Удалить рейтинг
    Допустим я нахожусь на странице логина
    Когда я ввожу "0555555555" в поле "Номер телефона"
    И я ввожу "123qwe" в поле "Пароль"
    И нажимаю на кнопку "Войти"
    Тогда я вижу главную страницу
    Когда я перехожу в "Панель администратора" через меню профиля
    И открываю вкладку "Рейтинги"
    И нажимаю на кнопку удалить у рейтинга
    Тогда я вижу попап с вопросом "Вы действительно хотите?"
    И нажимаю на кнопку "Удалить"
    Тогда я вижу уведомление "Рейтинг успешно удален"
