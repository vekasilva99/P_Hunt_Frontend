import React, { useEffect } from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import { CURRENT_USER } from "./graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GuardRoute from "./GuardRoutes";
import GuardRouteF from "./GuardRoutesF";
import Spinner from "../components/Spinner";
import Home from "../views/Home";
import HomeVoter from "../views/HomeVoter";
import MyVotes from "../views/MyVotes";
import MyProducts from "../views/MyProducts";
import CreateProduct from "../views/CreateProduct";
import LoginVoter from "../views/LoginVoter";
import RegisterVoter from "../views/RegisterVoter";
import RegisterFounder from "../views/RegisterFounder";
import LoginFounder from "../views/LoginFounder";

export default function Routes() {
  const { data, loading, error, refetch } = useQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
  });

  const { token, name, role } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !name) refetch();
  }, [name, refetch, token]);

  useEffect(() => {
    const tokenL = localStorage.getItem("token");
    if (tokenL && data && data.currentUser && !name) {
      dispatch({
        type: "CURRENT_USER",
        payload: {
          ...data.currentUser,
        },
      });
    }
  }, [data, dispatch, name]);
  return name && role ? (
    <Switch>
      <GuardRoute exact path="/voter" role={role} component={HomeVoter} />
      <GuardRoute exact path="/voter/myvotes" role={role} component={MyVotes} />
      <GuardRouteF
        exact
        path="/founder/myproducts"
        role={role}
        component={MyProducts}
      />
      <GuardRouteF
        exact
        path="/founder/createproduct"
        role={role}
        component={CreateProduct}
      />

      {role == "VOTER" ? (
        <Redirect exact from="*" to="/voter" />
      ) : role == "FOUNDER" ? (
        <Redirect exact from="*" to="founder/myproducts" />
      ) : (
        <Redirect exact from="*" to="/" />
      )}
    </Switch>
  ) : (!role && !loading && !data) ||
    (!role && !loading && data && !data.currentUser) ? (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />

      <Route
        exact
        path="/login"
        render={(props) => <LoginVoter {...props} />}
      />
      <Route
        exact
        path="/registervoter"
        render={(props) => <RegisterVoter {...props} />}
      />
      <Route
        exact
        path="/registerfounder"
        render={(props) => <RegisterFounder {...props} />}
      />
      <Route
        exact
        path="/loginf"
        render={(props) => <LoginFounder {...props} />}
      />

      <Redirect exact from="*" to="/" />
    </Switch>
  ) : (
    <PageLoading>
      {" "}
      <Spinner></Spinner>
    </PageLoading>
  );
}
const PageLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;
