import AT from "africastalking";

export function getSMSClient() {
  const apiKey = process.env.AT_API_KEY;
  const username = process.env.AT_USERNAME;

  if (!apiKey || !username) {
    throw new Error("Missing AT_API_KEY or AT_USERNAME environment variable");
  }

  return AT({
    apiKey,
    username,
  });
}
