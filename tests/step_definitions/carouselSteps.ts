import { I } from './steps';


// добовление файла в админ панель
When('я кликаю на кнопку в админ пенели {string}', (carouselAdminBtn:string) => {
    I.click(carouselAdminBtn);
});

When('я кликаю на кнопку в админ пенели карусели {string}', (carouselAdminBtn:string) => {
    I.click(carouselAdminBtn);
});

When(/^я загружаю файл "(.*?)"$/, (file:string) => {
    I.attachFile("input[type='file']", `${file}`);
    I.wait(1);
});
When('я кликаю на кнопку с инконкой', () => {
    I.waitForElement("[data-test-id='add-file-in-carousel']", 10);
    I.click(`[data-test-id="add-file-in-carousel"]`);
});
When('если данные пришли и я виже текст {string} то тест успешно завершен', (Msg:string) => {
    I.see(Msg);
});

// удаление файла из карусели





