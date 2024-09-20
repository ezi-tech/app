const url = `https://api.africastalking.com/version1/messaging`;

export async function sendSMS(phone: string, message: string) {
  const apikey = process.env.AT_API_KEY;
  const username = process.env.AT_USERNAME;
  const senderId = process.env.AT_SENDER_ID || "EZITECH";

  if (!apikey || !username) {
    throw new Error("Missing AT_API_KEY or AT_USERNAME environment variable");
  }

  return await fetch(url, {
    method: "POST",
    headers: {
      apikey,
      Accept: "application/json",
    },
    body: new URLSearchParams({
      username,
      to: phone,
      message,
      from: senderId,
      bulkSMSMode: "1",
    }),
  }).then((res) => res.json());
}
