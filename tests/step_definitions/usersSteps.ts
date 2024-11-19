import { I } from './steps';

// Общие шаги
When('ввожу в поле {string} значение {string}', (field: string, value: string) => {
    I.fillField(field, value);
});

When('нажимаю на кнопку {string}', (btn: string) => {
    I.click(btn);
});

Then('я должен быть на главной странице', () => {
    I.seeInCurrentUrl('/');
    I.dontSee('Авторизация');
    I.wait(2);
});



// Регистрация
Given('я нахожусь на странице регистрации', () => {
    I.amOnPage('/register');
});

When('в поле {string} выбираю {string}', (select: string, value: string) => {
    I.selectOption(`//*[contains(text(), '${select}')]/following-sibling::select`, value);
});

When('в поле {string} кликаю на галочку в чекбоксах.', (checkboxLabel: string) => {
    I.click(`//label[contains(text(), '${checkboxLabel}')]/preceding-sibling::button`);
});

// Логин
Given('я нахожусь на странице логина', () => {
    I.amOnPage('/login');
});

// Логаут
Given('я авторизован на сайте', () => {
    I.amOnPage('/login');
    I.fillField('Номер телефона', '0999 999 999');
    I.fillField('Пароль', '123qwe');
    I.click('Войти');
    I.seeInCurrentUrl('/');
});

Given('я нахожусь на главной странице', () => {
    I.seeInCurrentUrl('/');
});

When('я изменяю размер окна на {int} и {int} и нажимаю на иконку пользователя в хедере', (width: number, height: number) => {
    I.resizeWindow(width, height);
    I.wait(2);
    I.click(width <= 768 ? 'button[aria-haspopup="dialog"]' : 'button[aria-haspopup="menu"]');
});

When('я нажимаю на кнопку {string} на размерах {int} и {int}', (btn: string, width: number, height: number) => {
    I.resizeWindow(width, height);
    I.wait(2);
    const locator =
        width <= 768
            ? 'span.auth'
            : `//div[@role="menuitem" and text()="${btn}"]`;

    I.moveCursorTo(locator);
    I.waitForVisible(locator, 5);
    I.click(locator);
});

Then('я должен быть перенаправлен на главную страницу и видеть ссылку на авторизацию', () => {
    I.seeInCurrentUrl('/');
    I.see('Авторизация');
    I.wait(2);
});