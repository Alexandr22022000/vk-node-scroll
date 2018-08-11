const scrollTo = (position, oldPosition, time, store, callback) => {
        let timer = 0, scrolling = (position - oldPosition) / time, logicScroll = 0, realScroll = 0;

        const f = () => {
            logicScroll =+ scrolling;
            realScroll = logicScroll - (logicScroll % 1);
            logicScroll =- realScroll;
            store.webDriver.executeScript(`window.scrollBy(0, ${realScroll});`);

            timer++;
            if (timer > time) {
                callback();
            }
            else {
                setTimeout(f, 1);
            }
        };
        f();
    },
    calcRandoom = (value, range) => {
        return value + (Math.random() * range * ((Math.random() > 0.5) ? 1 : -1));
    };

module.exports = (config, store) => {
    store.webDriver.get(config.page)
        .then(() => {
            let y = 0, isScrolling = true;
            setTimeout(() => isScrolling = false, config.time);

            const f = () => {
                if (!isScrolling) return;

                setTimeout(() => {
                    scrollTo(calcRandoom(config.scrollSize, config.scrollRange), y, calcRandoom(config.scrollTime, config.scrollTimeRange), store, f);
                }, calcRandoom(config.delay, config.delayRange));
            };
            f();
        });
};