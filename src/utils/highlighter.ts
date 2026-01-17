import { createHighlighter } from 'shiki';

export const highlighterPromise = createHighlighter({
    langs: ['jsx', 'js'],
    themes: ['min-dark']
});
exports.handler = async (event, context) => {
  const apiKey = process.env.Hamid; // Accessing the secret

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};
