import { ActionArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { json } from "react-router";
import { v4 as uuidv4 } from "uuid";
import JoinChat from "~/theme/pages/JoinChat";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Zanon" },
    { name: "description", content: "Zanon, anonymous chat" },
  ];
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  const pseudo = formData.get("pseudo") as string;

  switch (action) {
    case "create-new-chat":
      const randomChatId = uuidv4();
    //return createUserSession({ request, chatId: randomChatId, pseudo });
    case "join-existing-chat":
      const chatId = formData.get("chat-id") as string;
      if (!chatId) {
        return redirect("/");
      }
    //return createUserSession({ request, chatId, pseudo });
    default:
      return json("unrecognized action: ", { status: 400 });
  }
};

const IndexRoute = () => {
  return <JoinChat />;
};

export default IndexRoute;
