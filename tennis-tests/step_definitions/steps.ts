const { I } = inject();

Given('I have a defined step', () => {
  // TODO: replace with your own step
});

Given('я нахожусь на стрице регистрации', () => {
  I.amOnPage('register');
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
  I.wait(5);
});
