import { I } from "./steps";

When(
  "ввожу в поле {string} значение {string}",
  (field: string, value: string) => {
    I.fillField(field, value);
  },
);

When("нажимаю на кнопку {string}", (btn: string) => {
  I.click(btn);
});

Then("я должен быть на главной", () => {
  I.wait(3);
  I.seeInCurrentUrl("/");
});

Then("я должен быть на админке", () => {
  I.wait(3);
  I.amOnPage("/admin");
  I.seeInCurrentUrl("/admin");
  I.wait(5);
});

When("я залогинен на сайте", () => {
  I.amOnPage("/login");
  I.fillField("Номер телефона", "0555 555 555");
  I.fillField("Пароль", "123qwe");
  I.click("Войти");
  I.seeInCurrentUrl("/");
  I.wait(5);
});

When("я нажимаю на иконку пользователя в хедере", () => {
  I.wait(1);
  I.click('button[aria-haspopup="menu"]');
});

Given("я нахожусь на странице логина", () => {
  I.amOnPage("/login");
});

Given("перехожу на админ панель", () => {
  I.seeElement("#admin");
  I.click("#admin");
});

Then("я нажимаю на кнопку {string}", (addPartner: string) => {
  I.wait(5);
  I.click(addPartner);
  I.wait(1);
});

Given("Загружаю изображения", () => {
  I.attachFile("input[type='file']", "public/Knauf.svg");
  I.wait(1);
});

Given("я вижу карточку партнера {string}", (partnerName: string) => {
  I.wait(2);
  I.seeElement(`[data-testid="${partnerName}"]`);
  I.wait(2);
});

When(
  "я нажимаю на кнопку редактирования партнера {string}",
  (partnerName: string) => {
    I.click(`[data-testid="${partnerName}"] button[data-testid="edit"]`);
    I.wait(1);
  },
);
When(
  "я нажимаю на кнопку удаления партнера {string}",
  (partnerName: string) => {
    I.click(`[data-testid="${partnerName}"] button[data-testid="delete"]`);
    I.wait(2);
  },
);
