export const { I } = inject();

Given("я нахожусь на странице рейтингов", () => {
  I.amOnPage("/rating");
});
When("я нажимаю на аккордеон рейтинга {string}", (ratingCategory: string) => {
  I.click(ratingCategory);
  I.wait(1);
});
Then("открывается список рейтингов по годам и месяцам", () => {
  I.seeElement("#accordion");
});
Then("я вижу список событий, связанных с выбранным рейтингом", () => {
  I.seeElement("#eventItem");
});
Then(
  "я вижу кнопку 'Открыть рейтинг' с атрибутом href, указывающим на Google Docs",
  () => {
    I.see("Открыть рейтинг", "#openRatingButton");
    I.seeElement({
      css: '#openRatingButton[href*="https://www.google.com"]',
    });
  },
);

When("я ввожу {string} в поле {string}", (value: string, field: string) => {
  I.fillField(field, value);
});

Then("я ввожу {string} в поле {string}", (value: string, field: string) => {
  I.fillField(field, value);
});

When("я вижу главную страницу", () => {
  I.seeInCurrentUrl("/");
  I.dontSee("Авторизация");
});

Then("я перехожу в {string} через меню профиля", () => {
  I.click("button[aria-haspopup='menu']");
  I.click("a[href='/admin']");
});

Then("открываю вкладку {string}", (tab: string) => {
  I.click(`//*[contains(text(), '${tab}')]`);
});

Then("в селекте {string} выбираю {string}", (select: string, value: string) => {
  I.selectOption(
    `//*[contains(text(), '${select}')]/following-sibling::select`,
    value,
  );
});

Then("ввожу {string} в поле {string}", (value: string, field: string) => {
  I.fillField(field, value);
});

Then("нажимаю на кнопку {string}", (btn: string) => {
  I.click(btn);
});

Then("я вижу уведомление {string}", (text: string) => {
  I.see(text);
});

Then("нажимаю на кнопку удалить у рейтинга", () => {
  I.click(locate('button[aria-label="deleteRating"]'));
  I.wait(1);
});

Then("я вижу попап с вопросом {string}", (question: string) => {
  I.see(question);
});

Then("нажимаю на кнопку удалить у события", () => {
  I.click(locate(`button[aria-label="delete-event"]`));
  I.wait(1);
});

Then("нажимаю на кнопку редактировать у события", () => {
  I.click(locate(`button[aria-label="edit-event"]`));
  I.wait(1);
});
