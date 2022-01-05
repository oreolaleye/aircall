import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Header from "../components/Header";
import ActivityFeed from "../views/ActivityFeed";
import Footer from "../components/Footer";

const MainScreen = () => {
  const [value, setValue] = useState(1);
  const [allCalls, setAllCalls] = useState([]);
  const [calls, setCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [dates, setDates] = useState([]);

  const getActivities = async () => {
    try {
      const res = await axios.get(
        "https://aircall-job.herokuapp.com/activities"
      );

      const list = addDateTime(res.data);
      const archived = getArchivedCalls(list);
      const unarchived = getNormalCalls(list);

      getDates(list);
      setAllCalls(list);
      setCalls(unarchived);
      setArchivedCalls(archived);
    } catch (error) {
      console.log(error);
    }
  };

  const getNormalCalls = (list) => {
    const calls = list.filter((call) => !call.is_archived);
    return calls;
  };
  const getArchivedCalls = (list) => {
    const archivedCalls = list.filter((call) => call.is_archived);
    return archivedCalls;
  };
  const addDateTime = (list) => {
    list.map((item) => {
      const date = moment(item.created_at).format("MMM DD, YYYY");
      const time = moment(item.created_at).format("hh:mm A");
      item.time = time;
      item.date = date;
    });
    return list;
  };

  const getDates = (list) => {
    let dateArr = [];
    list.map((activity) => {
      if (!dateArr.includes(activity.date)) {
        dateArr.push(activity.date);
      }
    });
    setDates(dateArr);
  };

  useEffect(() => {
    getActivities();
  }, []);
  const archiveCall = async (id) => {
    try {
      await axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: true,
      });

      addToArchive(id);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreCall = async (id) => {
    try {
      await axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: false,
      });

      removeFromArchive(id);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreAll = async () => {
    try {
      await axios.get("https://aircall-job.herokuapp.com/reset");
      setCalls(allCalls);
      setArchivedCalls([]);
    } catch (error) {
      console.log(error);
    }
  };

  const addToArchive = (id) => {
    let call;
    calls.forEach((item, index) => {
      if (item.id === id) {
        item.is_archived = true;
        call = item;

        calls.splice(index, 1);
      }
    });
    let duplicate = [...archivedCalls, call];
    let duplicate2 = sortList(duplicate);
    setCalls([...calls]);
    setArchivedCalls(duplicate2);
  };

  const removeFromArchive = (id) => {
    let call;
    archivedCalls.forEach((item, index) => {
      if (item.id === id) {
        item.is_archived = false;
        call = item;
        archivedCalls.splice(index, 1);
      }
    });

    let duplicate = [...calls, call];
    let duplicate2 = sortList(duplicate);
    setArchivedCalls([...archivedCalls]);
    setCalls(duplicate2);
  };

  const sortList = (list) => {
    const sortedList = list.sort((a, b) => (b.time > a.time ? 1 : -1));
    return sortedList;
  };

  return (
    <div>
      <div className="container">
        <Header value={value} setValue={setValue} />
        <div className="container-view">
          {value === 1 && (
            <ActivityFeed
              dates={dates}
              calls={calls}
              archiveCall={archiveCall}
            />
          )}
          {value === 2 && (
            <ActivityFeed
              dates={dates}
              calls={archivedCalls}
              archiveCall={restoreCall}
              restore={restoreAll}
              archive
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainScreen;
