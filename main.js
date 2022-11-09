const puppeteer = require('puppeteer')

const loginLink = 'https://www.hackerrank.com/auth/login'
const mail = 'fareya7568@invodua.com'
const password = 'helloworld'

let browserOpen = puppeteer.launch({
    headless : false,
    args : ['--start-maximized'],
    slowMo : true,
    defaultViewport : null
})

let page

browserOpen.then(function(browserObj){
    let BrowserOpenPromise = browserObj.newPage()
    return BrowserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1']", mail,{delay : 50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']", password,{delay : 50})
    return passwordIsEntered
}).then(function(){
    let LoginButtonClicked = page.click('button[data-analytics="LoginPassword"]', {delay : 50} )
    return LoginButtonClicked
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"',page)
    return getToWarmUp
}).then(function(){
    let waitfor3seconds = page.waitFor(3000)
})


function waitAndClick(selector, cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(error){
            reject()
        })
    })
}