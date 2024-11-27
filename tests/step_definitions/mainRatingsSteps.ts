import { I } from "./steps";

// Общие шаги

Then("я зашел на сайт как администратор", () => {
  I.amOnPage("/login");
  I.fillField("Номер телефона", "0555 555 555");
  I.fillField("Пароль", "123qwe");
  I.click("Войти");
  I.seeInCurrentUrl("/");
});

Given("я должен быть в административной панели", () => {
  I.click('button[aria-haspopup="menu"]');
  I.seeElement("#admin");
  I.click("#admin");
});

Then("я нажимаю на кнопку {string}", (btn: string) => {
  I.click(btn);
});

Given("я вижу карточку с текстом {string}", (memberName: string) => {
  I.seeElement(`[data-testid="${memberName}"]`);
});

When(
  "ввожу в поле {string} значение {string}",
  (field: string, value: string) => {
    I.fillField(field, value);
  },
);

Then("в селекте {string} выбираю {string}", (select: string, value: string) => {
  I.selectOption(
    `//*[contains(text(), '${select}')]/following-sibling::select`,
    value,
  );
});

Then("я вижу уведомление {string}", (text: string) => {
  I.see(text);
});

// Crud участника рейтинга

When(
  "я нажимаю на кнопку удаления в карточке участника рейтинга {string}",
  (memberName: string) => {
    I.click(`[data-testid="${memberName}"] button[data-testid="delete"]`);
    I.wait(1);
  },
);

When(
  "я нажимаю на кнопку редактирования в карточке участника рейтинга {string}",
  (memberName: string) => {
    I.click(`[data-testid="${memberName}"] button[data-testid="edit"]`);
    I.wait(1);
  },
);
