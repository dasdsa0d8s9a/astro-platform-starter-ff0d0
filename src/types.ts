import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  // Option 1: Type casting
  const apiKey = process.env.Hamid as string;

  if (!apiKey) {
    return { statusCode: 500, body: "Missing API Key" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};

export { handler };
