var _ = require('underscore'),
    state;

function pruneLongPollReqs() {
    if (!state.longPollReqs) return;

    var expireTime = new Date().getTime() - 30000,
        tooOld = function(lp) { return lp[2] <= expireTime; },
        expiringReqs = state.longPollReqs.filter(tooOld);

    expiringReqs.forEach(function(lp) {
        var res = lp[0];
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({"messages": []}));
    });

    state.longPollReqs = _.difference(state.longPollReqs, expiringReqs);
}

function start(serverState) {
    state = serverState;
    setInterval(pruneLongPollReqs, 1000);
}

exports.start = start;
