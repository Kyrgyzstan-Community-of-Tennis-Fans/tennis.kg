import { I } from './steps';

//Регистрация
Given('я нахожусь на стрице регистрации', () => {
    I.amOnPage('/register');
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
    I.fillField(name, value);
});

When('в поле {string} выбираю {string}', (select:string,value:string) => {
    I.selectOption(`//*[contains(text(), '${select}')]/following-sibling::select`, value);

});

When('в поле {string} кликаю на галочку в чекбоксах.', (checkboxLabel:string) => {
    I.click(`//label[contains(text(), '${checkboxLabel}')]/preceding-sibling::button`);
});

When('нажимаю на кнопку {string}', (btn:string) => {
    I.click(btn)
});

Then('я должен быть перенаправлен на главную страницу и видеть иконку в хедере', () => {
    I.seeInCurrentUrl('/');
    I.dontSee('Авторизация');
    I.wait(2);
});


//Логинка
Given('я нахожусь на странице логина', () => {
    I.amOnPage('/login');
});

When('ввожу в поле {string} значение {string}', (field: string, value: string) => {
    I.fillField(field, value);
});


When('нажимаю на кнопку {string}', (btn:string) => {
    I.click(btn)
});

Then('я должен быть перенаправлен на главную страницу', () => {
    I.seeInCurrentUrl('/');
    I.wait(2);
    I.dontSee('Авторизация');
});


//логаут на мобилках и десктопе
Given('я авторизован на сайте', () => {
    I.amOnPage('/login');
    I.fillField('Номер телефона', '0555 555 444');
    I.fillField('Пароль', '000000');
    I.click('Войти');
    I.seeInCurrentUrl('/');
});

Given('я нахожусь на главной странице', () => {
    I.seeInCurrentUrl('/');
});

When('я изменяю размер окна на {int} и {int} и нажимаю на иконку пользователя в хедере', (width: number, height: number) => {
    I.resizeWindow(Number(width), Number(height));
    I.wait(2);

    if (width <= 768) {
        I.click('button[aria-haspopup="dialog"]');
    } else {
        I.click('button[aria-haspopup="menu"]');
    }
});

When('я нажимаю на кнопку {string} на размерах {int} и {int}', (btn:string,width:number,height:number) => {
    I.resizeWindow(Number(width), Number(height));
    I.wait(2);

    if (width <= 768) {
        I.wait(2);
        I.moveCursorTo('span.auth');
        console.log('span.auth')
        I.click('span.auth');
    } else {
        I.wait(2);
        I.moveCursorTo(`//div[@role="menuitem" and text()="${btn}"]`);
        I.waitForVisible(`//div[@role="menuitem" and text()="${btn}"]`, 5);
        I.click('//div[@role="menuitem" and text()="Выйти"]');
    }
});

Then('я должен быть перенаправлен на главную страницу и видеть сыллку на авторизацию', () => {
    I.seeInCurrentUrl('/');
    I.see('Авторизация');
    I.wait(2);
});