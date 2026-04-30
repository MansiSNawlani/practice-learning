import { createdAt, updatedAt } from "@/drizzle/schemaHelpers";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { use } from "react";

export async function POST
    (request: NextRequest) {
        try {
       const event = await verifyWebhook(request)
       switch (event.type) {
        case "user.created":
            case "user.updated":
                const clearkData = event.data;
                const email = clearkData.email_addresses.find(e => e.id === clearkData.primary_email_address_id)?.email_address;
                if(email == null) {
                    return new Response("No Primary Email found", { status: 400 });
                }
                await upsertUser({
                    id: clearkData.id,
                    name: `${clearkData.first_name} ${clearkData.last_name}`,
                    email: email,
                    imageUrl: clearkData.image_url,
                    createdAt: new Date(clearkData.created_at),
                    updatedAt: new Date(clearkData.updated_at),
                })
                break;
            case "user.deleted":
                if(event.data.id == null) {
                    return new Response("No User ID found", { status: 400 });
                }
                await deleteUser(event.data.id);
                break;   
       }
        } catch (error) {
            return new Response("Invalid Webhook", { status: 400 });
        }

    return new Response("Webhook received", { status: 200 });
    }