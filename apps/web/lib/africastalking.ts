export async function sendSMS(phone: string, message: string) {
  const apikey = process.env.AT_API_KEY || "atsk_363ddc11f7ff5687efa4d9247e20cae642ab7a785f89b1066f64791598a0f1274a9ea43b";
  const username = process.env.AT_USERNAME || "ezitech";
  const senderId = process.env.AT_SENDER_ID || "EZITECH";

  if (!apikey || !username) {
    throw new Error("Missing AT_API_KEY or AT_USERNAME environment variable");
  }

  return fetch(`https://api.africastalking.com/version1/messaging`, {
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
