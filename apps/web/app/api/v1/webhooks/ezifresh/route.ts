import { sendSMS } from "@/lib/africastalking";
import { getEnv } from "@/lib/middleware/utils";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { db } from "@ezi/database/client";
import { Organization, User } from "@ezi/database/schema";

// export const runtime = "edge";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = getEnv(req, "EZIFRESH_CLERK_WEBHOOK_SECRET");

  if (!WEBHOOK_SECRET) {
    console.error("Missing EZIFRESH WEBHOOK_SECRET environment variable");
    throw new Error("Missing EZIFRESH WEBHOOK_SECRET environment variable");
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created": {
        const user = evt.data;
        const name = `${user.first_name} ${user.last_name}`;
        const email = user.email_addresses[0].email_address;
        const phone = user.phone_numbers[0].phone_number;

        await db.insert(User).values({
          id: user.id,
          name,
          email,
          phone,
        });

        break;
      }
      case "organization.created": {
        const organization = evt.data;
        const name = organization.name;
        const id = organization.id;

        await db.insert(Organization).values({
          id: id,
          name,
        });

        break;
      }
      case "sms.created": {
        const sms = evt.data;
        const to = sms.to_phone_number;
        const isTestPhone = to.startsWith("+15555550");

        if (isTestPhone) break;

        let message = sms.message;
        const code = sms.data!.otp_code;
        const appName = sms.data!.app.name;
        message = `${code} is your ${appName} verification code. Do not share this code with anyone`;

        await sendSMS(to, message);

        break;
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook event:", err, evt);
    return new Response("Error occured", {
      status: 400,
    });
  }
}
