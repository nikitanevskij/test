import React from "react";
import axios from "axios";

import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import NewCredit from "./NewCredit/NewCredit";
import ActiveCredit from "./ActiveCredit/ActiveCredit";
import logo from "./assets/SuperBank.png";

function App() {
  const [lists, setLists] = React.useState(null);
  const [visibleNewCreate, setVisible] = React.useState(true);
  const [activeCreditId, setActiveCredit] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:3001/lists").then(({ data }) => {
      setLists(data);
    });
  }, []);

  const changeVisible = (toggle) => {
    setVisible(toggle);
  };

  const visibleCredit = (id) => {
    // const activeList = lists.filter((item) => item.id === id);
    setActiveCredit(id);
    setVisible(false);
  };

  const addCredit = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const changeCredit = (obj) => {
    const indexObj = lists.map((item) => (item.id === obj.id ? obj : item));
    setLists(indexObj);
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="main">
        <div className="sidebar">
          <Sidebar
            lists={lists}
            changeVisible={changeVisible}
            visibleCredit={visibleCredit}
            activeCreditId={activeCreditId}
          />
        </div>
        <div className="content">
          {!visibleNewCreate && (
            <ActiveCredit
              activeCreditId={activeCreditId}
              changeCredit={changeCredit}
            />
          )}
          {visibleNewCreate && <NewCredit addCredit={addCredit} />}
        </div>
      </div>
    </div>
  );
}

export default App;
