import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const dt = DateTime.now()
const formatString = "yyyy LLL dd HH:mm:ss '('cccc')'"
const oneHundredYearsIsh = 3155760000
const oneBillion = 1000000000

function LiveCounter() {
    const [dateState, setDateState] = useState(DateTime.now())

    const oneBillionSecondsAgo = dateState.minus({ seconds: oneBillion}).toFormat(formatString);
    const oneBillionSecondsFromNow = dateState.plus({ seconds: oneBillion }).toFormat(formatString);

    useEffect(() => {
        setInterval(() => setDateState(DateTime.now()), 500);
    }, [])

    return <div className="section px-0 pt-0">
        <p>One billion seconds ago:</p>
        <p className="is-size-5 has-text-weight-semibold is-family-monospace">{oneBillionSecondsAgo}</p>
        <br></br>
        <p>One billion seconds from now:</p>
        <p className="is-size-5 has-text-weight-semibold is-family-monospace">{oneBillionSecondsFromNow}</p>
    </div>
}

function AgeCalculator() {
    const [stableDateState] = useState(DateTime.now())
    const randomBirthday = DateTime.now().minus({ seconds: getRandomInt(0, oneHundredYearsIsh)});
    const [birthdayState, setBirthdayState] = useState({year: randomBirthday.year, month: randomBirthday.month, day: randomBirthday.day})

    const updateYear = (event) => setBirthdayState({...birthdayState, year: event.target.value})
    const updateMonth = (event) => setBirthdayState({...birthdayState, month: event.target.value})
    const updateDay = (event) => setBirthdayState({...birthdayState, day: event.target.value})

    let birthdayDateFormat = "##";
    let ageInBillionSeconds = "--";
    try {
        const bday = DateTime.fromObject(birthdayState);
        if (!bday.isValid) {
            throw "invalid date"
        }
        ageInBillionSeconds = (stableDateState.diff(bday, 'seconds').seconds / oneBillion).toFixed(2);

        birthdayDateFormat =  bday.toLocaleString(DateTime.DATE_FULL);
    } catch {
        birthdayDateFormat = "--";
        ageInBillionSeconds = "--"
    }


    return <div className="section px-0 pt-0">
        <p>If you were born on <span className="is-size-5 has-text-weight-semibold is-family-monospace">{birthdayDateFormat}</span> you are <span className="is-size-5 has-text-weight-semibold is-family-monospace">{ageInBillionSeconds} billion seconds old</span></p>
        <br></br>
        <div className="container is-max-desktop mx-0">
            <div className="field-body">
                <div className="field">
                    <label className="label">Year</label>
                    <div className="control">
                        <input className="input" type="text" value={birthdayState.year} onChange={updateYear} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Month</label>
                    <div className="control">
                        <input className="input" type="text" value={birthdayState.month} onChange={updateMonth} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Day</label>
                    <div className="control">
                        <input className="input" type="text" value={birthdayState.day} onChange={updateDay} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default function App() {
    return <div>
        <LiveCounter/>
        <AgeCalculator/>
    </div>

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
