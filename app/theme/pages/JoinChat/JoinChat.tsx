import { Form, useSearchParams } from "@remix-run/react";
import Box from "~/theme/components/Box";
import Button from "~/theme/components/Button";
import Input from "~/theme/components/Form/Input";

const JoinChat = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  return (
    <div className="join-chat">
      <div className="join-chat__title">
        {chatId ? `Join ${chatId}` : "Create a new chat"}
      </div>
      <Box>
        <Form method="post">
          <Input
            required
            autoFocus
            id="pseudo"
            name="pseudo"
            type="text"
            defaultValue="Anonymous"
            label="Pseudo"
          />

          {chatId ? (
            <>
              <input type="hidden" name="chat-id" value={chatId} />
              <input type="hidden" name="_action" value="join-existing-chat" />
            </>
          ) : (
            <input type="hidden" name="_action" value="create-new-chat" />
          )}
          <Button type="submit">{chatId ? "Join" : "Create"}</Button>
        </Form>
      </Box>
    </div>
  );
};

export default JoinChat;
