import { I } from './steps';

When('я кликаю на кнопку в админ пенели {string}', (carouselAdminBtn:string) => {
    I.click(carouselAdminBtn);
});

When(/^я загружаю файл "(.*?)"$/, (file:string) => {
    I.attachFile("input[type='file']", `${file}`);
    I.wait(1);
});

When('я кликаю на кнопку с инконкой в котором есть дата {string}', (dataId:string) => {
    I.waitForElement(`[data-test-id='${dataId}']`, 10);
    I.click(`[data-test-id="${dataId}"]`);
});

When('если я вижу текст {string} то тест успешно завершен', (Msg:string) => {
    I.see(Msg);
});







