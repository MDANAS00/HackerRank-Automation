const puppeteer = require('puppeteer')
const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login'
const mail = 'tewoxisi@decabg.eu'
const password = 'helloworld'

let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    slowMo: true,
    defaultViewport: null
})

let page

browserOpen.then(function (browserObj) {
    let BrowserOpenPromise = browserObj.newPage()
    return BrowserOpenPromise;
}).then(function (newTab) {
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", mail, { delay: 50 })
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })
    return passwordIsEntered
}).then(function () {
    let LoginButtonClicked = page.click('button[data-analytics="LoginPassword"]', { delay: 50 })
    return LoginButtonClicked
}).then(function () {
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function () {
    let getToWarmUp = waitAndClick('input[value="warmup"]', page)
    return getToWarmUp
}).then(function () {
    let waitfor3seconds = page.waitForTimeout(3000)
    return waitfor3seconds
}).then(function () {
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 })
    return allChallengesPromise
}).then(function (questionArr) {
    console.log('Number of Questions : ', questionArr.length)
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answers[0])
    return questionWillBeSolved
})


function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function () {
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function (error) {
            reject()
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function () {
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise
        }).then(function () {
            return waitAndClick('.checkbox-input', page)
        }).then(function () {
            return page.waitForSelector('.custom-input.theme-old.size-medium', page)
        }).then(function () {
            return page.type('.custom-input.theme-old.size-medium', answer, { delay: 10 })
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 })
            return AisPressed
        }).then(function () {
            let XisPressed = page.keyboard.press('X', { delay: 100 })
        }).then(function () {
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function () {
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return mainEditorInFocus
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 })
            return AisPressed
        }).then(function () {
            let VisPressed = page.keyboard.press('V', { delay: 100 })
            return VisPressed
        }).then(function () {
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', {delay : 50})
        }).then(function(){
            resolve()
        }).then(function(){
            reject()
        })
    })
}