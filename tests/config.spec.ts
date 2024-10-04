import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});


test('First use', async ({ page }) => {
    await page.getByLabel('Country').selectOption('{"name":"Switzerland","isoCode":"CH","officialLanguages":["DE","FR","IT","RM"]}');
    await page.getByLabel('SubDivision').selectOption('{"code":"CH-ZH","isoCode":"CH-ZH","name":"Zürich","shortName":"ZH","category":"canton","officialLanguages":["DE"]}');
    await page.getByRole('dialog').getByText('Tue').click();
    await page.getByRole('dialog').getByText('Thu', { exact: true }).click();
    await page.getByRole('dialog').getByText('Fri', { exact: true }).click();
    await page.getByRole('dialog').getByText('Wed').click();
    await page.getByRole('dialog').getByText('Mon', { exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    while (!(await page.locator('text=December 2024').isVisible())) {
        await page.getByRole('link').nth(1).click();
    }

    const text = await page.locator('text=December 2024').isVisible();
    expect(text).toBeTruthy();

});
