const { chromium } = require('playwright');
const fs = require('fs');
require('dotenv').config();

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const fileContent = fs.readFileSync(process.env.ISSUE_ID_CSV_PATH, 'utf-8');
    const tickets = fileContent.split("\n");

    await page.goto(`${process.env.EASYPROJECT_BASE_URL}/login`);

    console.log('Please log in manually');

    await page.waitForURL("**/my/page", { timeout: 0 });

    for (let i = 0; i < tickets.length; i++) {
        const id = tickets[i].trim();

        console.log(`Downloading ticket ${id}`);
        await page.goto(`${process.env.EASYPROJECT_BASE_URL}/issues/${id}`, { waitUntil: 'domcontentloaded' });

        const button = page.locator('#load-more-easy-journal-history');
        while (await button.count() > 0 && await button.isEnabled() && await button.isVisible()) {
            await button.click();
            await page.waitForLoadState('networkidle');
        }

        await page.pdf({
            path: `${process.env.PDF_SAVE_PATH}/Ticket-${id}.pdf`,
            format: 'A4',
            printBackground: false,
            displayHeaderFooter: true
        });

        console.log(`Saved Ticket-${id}.pdf`);
    }

    await browser.close();
})();   