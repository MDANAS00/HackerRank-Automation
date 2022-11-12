const puppeteer = require('puppeteer')
const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login'
const mail = 'tewoxisi@decabg.eu'
const password = 'helloworld';

(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            slowMo: true,
            defaultViewport: null
        })
        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink)
        await newTab.type("input[id='input-1']", mail, { delay: 50 })
        await newTab.type("input[type='password']", password, { delay: 50 })
        await newTab.click('button[data-analytics="LoginPassword"]', { delay: 50 })
        await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab)
        await waitAndClick('input[value="warmup"]', newTab)
        let allChallanges = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 })
        console.log('Total questions', allChallanges.length)
        let questionWillBeSolved = questionSolver(newTab,allChallanges[0], codeObj.answers[0]);
        return questionWillBeSolved
    } catch (error) {
        console.log(error)
    }
})()

async function waitAndClick(selector, cPage) {
    await cPage.waitForSelector(selector)
    let selectorClicked = cPage.click(selector)
    return selectorClicked
}

async function questionSolver(page, question, answer) {
    await question.click()
    await waitAndClick('.monaco-editor.no-user-select.vs', page)
    await waitAndClick('.checkbox-input', page)
    await page.waitForSelector('.custom-input.theme-old.size-medium', page)
    await page.type('.custom-input.theme-old.size-medium', answer, { delay: 10 })
    await page.keyboard.down('Control')
    await page.keyboard.press('A', { delay: 100 })
    await page.keyboard.press('X', { delay: 100 })
    await page.keyboard.up('Control')
    await waitAndClick('.monaco-editor.no-user-select.vs', page)
    await page.keyboard.down('Control')
    await page.keyboard.press('A', { delay: 100 })
    await page.keyboard.press('V', { delay: 100 })
    await page.keyboard.up('Control')
    await page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', {delay : 50})
}