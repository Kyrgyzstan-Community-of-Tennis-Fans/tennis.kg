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
  I.seeInCurrentUrl("/");
  I.dontSee("Авторизация");
  I.wait(1);
});

Then("я должен быть на админке", () => {
  I.amOnPage("/admin");
  I.wait(1);
  I.seeInCurrentUrl("/admin");
  I.dontSee("Авторизация");
  I.wait(2);
});

When("я залогинен на сайте", () => {
  I.amOnPage("/login");
  I.fillField("Номер телефона", "0555 555 555");
  I.fillField("Пароль", "123qwe");
  I.click("Войти");
  I.seeInCurrentUrl("/");
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
  I.wait(2);
});

Then("я нажимаю на кнопку {string}", (addPartner: string) => {
  I.click(addPartner);
  I.wait(3);
});

Given("Загружаю изображения", () => {
  I.attachFile("input[type='file']", "public/Knauf.svg");
});
