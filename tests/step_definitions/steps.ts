export const { I } = inject();

Given("я нахожусь на странице рейтингов", () => {
    I.amOnPage("/rating");
});
When("я нажимаю на аккордеон рейтинга {string}", (ratingCategory:string) => {
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