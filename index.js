
module.exports = function blocked (fn, options) {
    const opts = options || {};
    const start = process.hrtime();
    const interval = opts.interval || 2500;
    const threshold = opts.threshold || 200;

    return setInterval(function blockedTimer () {
        const delta = process.hrtime(start);
        const nanosec = delta[0] * 1e9 + delta[1];
        const ms = nanosec / 1e6;
        const n = ms - interval;

        if (n > threshold) {
            fn(Math.round(n));
        }
        start = process.hrtime();
    }, interval).unref();
};
