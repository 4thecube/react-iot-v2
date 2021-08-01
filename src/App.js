import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import app from "./firebase";
import HomePage from "./pages/home/HomePage";
import { fetchDataAsync } from "./redux/meteodata/meteodata.actions";
import "./App.scss";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HamburgerMenu from "./components/hamburger-menu/HamburgerMenu.component";
import DataListPage from "./pages/data-list/DataList.page";

function App({ fetchData, fetchedData }) {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const subscribeFromAuth = app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    fetchData(app);
    setData(fetchedData);

    return () => {
      subscribeFromAuth();
    };
  }, []);

  //FIXME:
  // 1. Dashboard page is kinda overload - need to split shit in little shitties
  // 2. Names need to be more clear
  //- DONE  3. Speed up the background animation
  //- DONE  4. Change height of blocks on second slide
  //- DONE  5. Message from invalid inputs
  //- DONE  6. Change Sign In for smaller displays - 35%
  //- DONE 7. Fix subtitle in the last text-block;
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" render={() => <HomePage user={currentUser} />}>
          {currentUser ? <Redirect to="/dashboard" /> : null}
        </Route>
        {currentUser ? (
          <>
            <HamburgerMenu />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/all" component={DataListPage} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  fetchedData: state.data.fetchedData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (app) => dispatch(fetchDataAsync(app)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
