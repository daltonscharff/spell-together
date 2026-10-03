import { FieldOutputTypes } from "@/prisma/contract";
import { db } from "@/prisma/db";

export type RoomResponse = FieldOutputTypes["public"]["Room"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;
  const room: RoomResponse | null = await db.orm.public.Room.where({
    shortcode,
  }).first();
  if (!room) {
    return new Response(JSON.stringify({ error: "Room not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(room), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
