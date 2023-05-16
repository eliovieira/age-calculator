import Result from "./Result";
import { useState, useRef, useEffect } from "react";
import Arrow from "../assets/images/icon-arrow.svg";

const Panel = () => {
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const inputDay = useRef();
  const inputMonth = useRef();
  const inputYear = useRef();

  useEffect(() => {
    inputDay.current.focus();
  }, []);

  function getDateDiffInYMD(startDate, endDate) {
    const oneDayMs = 1000 * 60 * 60 * 24;
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / oneDayMs);
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30.44) % 12;
    const days = diffDays - years * 365 - Math.floor(months * 30.44);
    if (year < 0 || months < 0 || days < 0) {
      setError({ year: "Wrong Year? Must be in the past." });
    } else {
      setResult({ year: years, month: months, days: days });
      setError(null);
    }
  }

  const validateData = (day, month, year) => {
    if (!day) {
      inputDay.current.focus();
      setError({ day: "This field is required" });
      return false;
    } else if (isNaN(+day) || day > 31 || day < 1) {
      setError({ day: "Must be a valid day" });
      inputDay.current.focus();
      return false;
    } else if (!month) {
      inputMonth.current.focus();
      setError({ month: "This field is required" });
      return false;
    } else if (isNaN(+month) || month > 12 || month < 1) {
      inputMonth.current.focus();
      setError({ month: "Must be a valid Month" });
      return false;
    } else if (!year) {
      inputYear.current.focus();
      setError({ year: "This field is required" });
      return false;
    } else if (year > 2023) {
      inputYear.current.focus();
      setError({ year: "Wrong Year. Must be in the past" });
      return false;
    } else if (isNaN(+year) || year < 1700) {
      inputYear.current.focus();
      setError({ year: "Must be a valid year" });
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData(day, month, year)) {
      const dateUser = new Date(year, month, day);
      const dateNow = new Date();
      getDateDiffInYMD(dateUser, dateNow);
    }
  };

  return (
    <div className="panel">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Day</label>
          <input
            ref={inputDay}
            placeholder="DD"
            onChange={(e) => {
              setDay(e.target.value);
            }}
          />
          {error?.day && <span className="error">{error.day}</span>}
        </div>
        <div className="field">
          <label>Month</label>
          <input
            ref={inputMonth}
            placeholder="MM"
            onChange={(e) => setMonth(e.target.value)}
          />
          {error?.month && <span className="error">{error.month}</span>}
        </div>
        <div className="field">
          <label>Year</label>
          <input
            ref={inputYear}
            placeholder="YYYY"
            onChange={(e) => setYear(e.target.value)}
          />
          {error?.year && <span className="error">{error.year}</span>}
        </div>

        <button className="submit-button">
          <img src={Arrow} alt="Click here" />
        </button>
      </form>

      <Result result={result} />
    </div>
  );
};

export default Panel;
