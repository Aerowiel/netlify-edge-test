import { ActionArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { json } from "react-router";
import { v4 as uuidv4 } from "uuid";
import JoinChat from "~/theme/pages/JoinChat";

const IndexRoute = () => {
  return <JoinChat />;
};

export default IndexRoute;
