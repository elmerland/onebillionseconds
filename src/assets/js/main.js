import { DateTime } from "luxon";

console.log("hello again");

const dt = DateTime.now()
const oneBillionSecondsAgo = dt.minus({ seconds: 1000000000})
const oneBillionSecondsFromNow = dt.plus({ seconds: 1000000000 })

document.getElementById("onebillionsecondsago").innerHTML = oneBillionSecondsAgo.toLocaleString(DateTime.DATETIME_HUGE);
document.getElementById("onebillionsecondsfromnow").innerHTML = oneBillionSecondsFromNow.toLocaleString(DateTime.DATETIME_HUGE);
