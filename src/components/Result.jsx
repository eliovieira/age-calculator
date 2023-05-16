import Number from "./Number";

const Result = ({ result }) => {
  return (
    <div className="result">
      <span className="score">
        <span className="purple-text">
          {result ? Number(result.year) : "- - "}
        </span>
        years
      </span>
      <span className="score">
        <span className="purple-text">
          {" "}
          {result ? Number(result.month) : "- - "}{" "}
        </span>{" "}
        months
      </span>
      <span className="score">
        <span className="purple-text">
          {result ? Number(result.days) : "- - "}{" "}
        </span>{" "}
        days
      </span>
    </div>
  );
};

export default Result;
