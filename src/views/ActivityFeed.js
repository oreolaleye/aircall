import React from "react";
import ActivityCard from "../components/ActivityCard";

const ActivityFeed = (props) => {
  const { dates, calls, archiveCall, archive, restore } = props;

  const filterByDate = (date, list) => {
    const filteredList = list.filter((item) => item.date === date);
    return filteredList;
  };
  return (
    <div className="feed">
      {calls.length > 0 ? (
        <div>
          {archive && (
            <button className="btn" onClick={restore}>
              Restore All
            </button>
          )}
          {dates &&
            dates.map((date) => (
              <div key={date}>
                {filterByDate(date, calls).length > 0 && <p>{date}</p>}
                {filterByDate(date, calls).map((call) => (
                  <div key={call.id}>
                    <ActivityCard data={call} action={archiveCall} />
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        "No activity"
      )}
    </div>
  );
};

export default ActivityFeed;
