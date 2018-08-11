const webdriver = require("selenium-webdriver"),
    By = require("selenium-webdriver").By,
    until = require("selenium-webdriver").until,
    chrome = require("selenium-webdriver/chrome"),
    proxy = require('selenium-webdriver/proxy'),
    chromedriver = require('chromedriver');

const checkLogin = (webDriver, callback) => {
    setTimeout(() => {
        webDriver.findElement(By.id('l_ph'))
            .then(callback, () => checkLogin(webDriver, callback));
    }, 50);
};

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

module.exports = (data, store, callback) => {
    store.webDriver = new webdriver
        .Builder()
        .withCapabilities(webdriver.Capabilities.chrome());

    if (data.proxy) {
        store.webDriver.setProxy(proxy.manual({https: data.proxy, http: data.proxy}))
    }

    store.webDriver = store.webDriver
        .forBrowser('chrome')
        .build();

    store.webDriver.manage().window().maximize();

    store.webDriver.manage().deleteAllCookies();

    store.webDriver.get("https://vk.com")
        .then(() => {
            store.webDriver.findElement(By.id('index_email'))
                .sendKeys(data.phone);

            store.webDriver.findElement(By.id('index_pass'))
                .sendKeys(data.password);

            store.webDriver.findElement(By.id('index_login_button'))
                .click();

            checkLogin(store.webDriver, callback);
        });
};