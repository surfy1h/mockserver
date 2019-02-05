const queryIndex = request.url.indexOf('?')
let k = [];

const parseQuery = (url) => {
    let vars = {};
    url.substring(queryIndex + 1).split("&").forEach((chunk) => {
        const arr = chunk.split("=");
        vars[arr[0]] = arr[1];
    });
    return vars;
}

const timeToPrice = (time) => {
    const fakePeriod = 86400;
    const step = 100;
    return (step / 4 * (1 + Math.cos((time / fakePeriod) * 2 * Math.PI)) + parseInt(step * time / fakePeriod));
}

if (queryIndex != -1) {
    const vars = parseQuery(request.url);
    const period = parseInt(vars.period) * 60;
    const time_to = parseInt(vars.time_to);
    const time_from = parseInt(vars.time_from);
    let time = time_from;
    let open;
    let high;
    let low;
    let close;

    while (time < time_to) {
        open = timeToPrice(time);
        close = timeToPrice(time + period);
        high = close + 2;
        low = open - 2;
        k.push([time, open, high, low, close]);
        time += period;
    }
}

module.exports = k;
