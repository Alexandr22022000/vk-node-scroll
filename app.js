const login = require('./app/vk/login'),
    scroll = require('./app/vk/scroll'),
    store = {
        webDriver: null,
    };

login({
    phone: "79618644681",
    password: "FackingPassword01",
    //proxy: '103.111.2.6:53281',
}, store, () => {
    scroll({
        page: 'https://vk.com/gunsmag',
        time: 30 * 1000,

        scrollSize: 700,
        scrollRange: 200,
        scrollTime: 300,
        scrollTimeRange: 200,
        delay: 1000,
        delayRange: 500,
    }, store);
});