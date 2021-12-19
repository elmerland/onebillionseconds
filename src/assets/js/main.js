import { DateTime } from "luxon";

console.log("hello again");

const dt = DateTime.now()
const oneBillionSecondsAgo = dt.minus({ seconds: 1000000000})
console.log(oneBillionSecondsAgo.toString());

document.getElementById("onebillionsecondsago").innerHTML = oneBillionSecondsAgo.toLocaleString(DateTime.DATETIME_HUGE);
