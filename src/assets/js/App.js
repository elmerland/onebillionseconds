import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const formatString = "yyyy LLL dd HH:mm:ss '('cccc')'";
const oneBillion = 1000000000;

const oneYearInSeconds = 31556952;
const oneCenturyInSeconds = oneYearInSeconds * 100;
const oneDayInSeconds = 86400
const oneHourInSeconds = 3600;
const oneMinuteInSeconds = 60;

function secondsToDuration(seconds) {
    let availSeconds = seconds

    const numCenturies = Math.floor(availSeconds / oneCenturyInSeconds);
    availSeconds = availSeconds % oneCenturyInSeconds;
    const numYears = Math.floor(availSeconds / oneYearInSeconds);
    availSeconds = availSeconds % oneYearInSeconds;
    const numDays = Math.floor(availSeconds / oneDayInSeconds);
    availSeconds = availSeconds % oneDayInSeconds;
    const numHours = Math.floor(availSeconds / oneHourInSeconds);
    availSeconds = availSeconds % oneHourInSeconds;
    const numMinutes = Math.floor(availSeconds / oneMinuteInSeconds);
    availSeconds = availSeconds % oneMinuteInSeconds;

    const centuryLabel = numCenturies > 1 ? 'centuries' : 'century';
    const yearsLabel = numYears > 1 ? 'years' : 'year';
    const daysLabel = numDays > 1 ? 'days' : 'day';
    const hoursLabel = numHours > 1 ? 'hours' : 'hour';
    const minutesLabel = numMinutes > 1 ? 'minutes' : 'minute';
    const secondsLabel = availSeconds > 1 ? 'seconds' : 'second';

    let output = [];
    if (numCenturies > 0) { output.push(`${numCenturies} ${centuryLabel}`)}
    if (numYears > 0) { output.push(`${numYears} ${yearsLabel}`)}
    if (numDays > 0) { output.push(`${numDays} ${daysLabel}`)}
    if (numHours > 0) { output.push(`${numHours} ${hoursLabel}`)}
    if (numMinutes > 0) { output.push(`${numMinutes} ${minutesLabel}`)}
    if (availSeconds > 0) { output.push(`${availSeconds} ${secondsLabel}`)}

    return output.join(' ')
}

export function SecondsCalculator() {
    const [inputState, setInputState] = useState(1000000000)

    const updateInput = (event) => {
        let intValue = parseInt(event.target.value)
        if (isNaN(intValue)) {
            intValue = 0;
        }
        setInputState(intValue);
    }
    return (<div className="field-body">
        <div className="field is-narrow">
            <label className="label">Seconds</label>
            <div className="control">
                <input className="input" type="text" value={inputState} onChange={updateInput} />
            </div>
            <p className="help">{inputState.toLocaleString()}</p>
        </div>
        <div className="field is-expanded">
            <label className="label">Equivalent</label>
            <div className="control">
                <input className="input is-static has-text-weight-semibold is-family-monospace" type="text" value={secondsToDuration(inputState)} readOnly/>
            </div>
        </div>
    </div>);
}

export function ProgressBar() {
    const [progressVal, setProgressVal] = useState(0);
    const [playState, setPlayState] = useState(false)
    useEffect(() => {
        if (!playState ) {
            // Only start timer if play status is true
            return;
        }
        const interval = setInterval(() => {
            setProgressVal(progressVal => {
                if (progressVal >= 100) {
                    setPlayState(false);
                }
                return (progressVal + 1)
            });
        }, 10);
        return () => clearInterval(interval)
    }, [playState])

    const togglePlay = () => {
        // Reset progress bar when play status will be set to true
        if (!playState) {
            setProgressVal(0);
        }
        setPlayState(!playState)
    }

    return (<div className="is-flex is-justify-content-left is-align-items-center" style={{ height: '3em' }}>
            {!playState &&
                <button className="button mr-3" onClick={togglePlay}>
                    {"Show me one second!"}
                </button>
            }
            {playState && <progress className="progress is-large is-flex-grow-1" value={progressVal.toString()} max="100">{progressVal}</progress>}
    </div>);
}

function LiveCounter() {
    const [dateState, setDateState] = useState(DateTime.now())

    const oneBillionSecondsAgo = dateState.minus({ seconds: oneBillion}).toFormat(formatString);
    const oneBillionSecondsFromNow = dateState.plus({ seconds: oneBillion }).toFormat(formatString);

    useEffect(() => {
        setInterval(() => setDateState(DateTime.now()), 500);
    }, [])

    return <div>
        <p>One billion seconds ago:</p>
        <p className="is-size-5 has-text-weight-semibold is-family-monospace">{oneBillionSecondsAgo}</p>
        <br></br>
        <p>One billion seconds from now:</p>
        <p className="is-size-5 has-text-weight-semibold is-family-monospace">{oneBillionSecondsFromNow}</p>
    </div>
}

function AgeCalculator() {
    const [stableDateState] = useState(DateTime.now())
    const randomBirthday = DateTime.now().minus({ seconds: getRandomInt(0, oneCenturyInSeconds)});
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


    return <div>
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

export function App() {
    return <div>
        <LiveCounter/>
        <br/>
        <AgeCalculator/>
    </div>

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
