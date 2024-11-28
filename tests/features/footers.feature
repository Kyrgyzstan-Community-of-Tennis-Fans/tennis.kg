# language: ru

Функционал: Работа администратора с подвалом сайта
  Как админ сайта я могу создать, удалять и
  редактировать ссылки на элементы в подвале сайта.

# Сценарий CRUD элемента социальной сети.

  @delete-social-network-icon
  Сценарий: Удалить социальную сеть
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    И я вижу иконку "Instagram"
    И я нажимаю на кнопку удалить иконку "Instagram"
    Тогда я кликаю на кнопку "Удалить"
    Тогда в футер я не вижу иконку у которой есть ссылка "https://admin@mail.ru"

  @add-social-network-icon
  Сценарий: Добавить социальную сеть
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    Тогда я кликаю на кнопку "Добавить социальную сеть"
    И я нажимаю на текст "Выберите социальную сеть" и в поле выбираю "Instagram"
    И ввожу в поле "Введите URL социальной сети" значение "https://admin@gmail.com"
    Тогда я кликаю на кнопку "Добавить"
    Тогда в футер я вижу иконку у которой ссылка "https://admin@gmail.com"

  @edit-social-network-icon
  Сценарий: Отредактировать социальную сеть
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    И я вижу иконку "Instagram"
    И я нажимаю на кнопку редактирования иконки "Instagram"
    И ввожу в поле "Введите URL социальной сети" значение "https://admin@mail.ru"
    Тогда я кликаю на кнопку "Сохранить"
    Тогда в футер я вижу иконку у которой ссылка "https://admin@mail.ru"

# Сценарий CRUD элемента меню положения.

  @add-menu-position
  Сценарий: Добавить меню положение
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    Тогда я кликаю на кнопку "Меню положение"
    Тогда я кликаю на кнопку "Добавить пункт в положение"
    И ввожу в поле "Введите название пункта" значение "Условия участия в сообществе КСЛТ"
    И ввожу в поле "Введите адрес ссылки на страницу" значение "https://google.com"
    Тогда я кликаю на кнопку "Добавить"
    Тогда в меню положения я вижу текст "Условия участия в сообществе КСЛТ"

  @edit-menu-position
  Сценарий: Отредактировать меню положение
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    Тогда я кликаю на кнопку "Меню положение"
    И я вижу карточку у которой внутри есть текст "Условия участия в сообществе КСЛТ"
    И я нажимаю на кнопку редактирования меню положения "Условия участия в сообществе КСЛТ"
    И ввожу в поле "Введите название пункта" значение "Новое условие участия в сообществе КСЛТ"
    И ввожу в поле "Введите адрес ссылки на страницу" значение "https://new.google.com"
    Тогда я кликаю на кнопку "Сохранить"
    Тогда в меню положения я вижу текст "Новое условие участия в сообществе КСЛТ"

  @delete-menu-position
  Сценарий: Удалить меню положение
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    Тогда я кликаю на кнопку "Меню положение"
    И я вижу карточку у которой внутри есть текст "Новое условие участия в сообществе КСЛТ"
    И я нажимаю на кнопку удаления меню положения "Новое условие участия в сообществе КСЛТ"
    Тогда я кликаю на кнопку "Удалить"
    Тогда в меню положения я не вижу текста "Новое условие участия в сообществе КСЛТ"

# Сценарий UPDATE элемента публичная оферта.

  @edit-public-offer
  Сценарий: Отредактировать публичную оферту
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    Тогда я кликаю на кнопку "Публичная оферта"
    Тогда я кликаю на кнопку "Изменить публичную оферту"
    И ввожу в поле "Введите URL публичной оферты" значение "https://new.public-offer.ru"
    Тогда я кликаю на кнопку "Сохранить"
    Тогда в футере я вижу обновленную ссылку на публичную оферту "https://new.public-offer.ru"

# Сценарий UPDATE элемента генеральный партнер.

  @edit-general-partner
  Сценарий: Отредактировать изображение генерального партнера
    Допустим я зашел на сайт как администратор
    И я должен быть в административной панели
    Тогда я кликаю на кнопку "Подвал сайта"
    Тогда я кликаю на кнопку "Ген.партнер"
    Тогда я кликаю на кнопку "Изменить ген.партнера"
    И я обновлению изображение генерального партнера
    Тогда я кликаю на кнопку "Сохранить"
    И я вижу всплывающие сообщение "Изображение успешно обновлено."