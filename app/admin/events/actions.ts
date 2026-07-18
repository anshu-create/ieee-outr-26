"use server";

import { addEvent, updateEvent } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEventAction(formData: FormData, imageUrl?: string) {
  const newEvent: any = {
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    status: formData.get("status") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
  };

  const rawDate = formData.get("date") as string;
  if (rawDate) {
    if (rawDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [y, m, d] = rawDate.split('-');
      const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
      newEvent.date = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } else {
      newEvent.date = rawDate;
    }
  }

  const link = formData.get("link") as string;
  if (link) newEvent.link = link;

  const time = formData.get("time") as string;
  if (time) newEvent.time = time;

  if (imageUrl) newEvent.imageUrl = imageUrl;

  const speaker = formData.get("speaker") as string;
  if (speaker) newEvent.speaker = speaker;

  await addEvent(newEvent);

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events?success=Event+created+successfully");
}

export async function updateEventAction(id: number, formData: FormData, imageUrl?: string) {
  const updatedEvent: any = {
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    status: formData.get("status") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
  };

  const rawDate = formData.get("date") as string;
  if (rawDate) {
    if (rawDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [y, m, d] = rawDate.split('-');
      const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
      updatedEvent.date = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } else {
      updatedEvent.date = rawDate;
    }
  }

  const link = formData.get("link") as string;
  if (link) updatedEvent.link = link;

  const time = formData.get("time") as string;
  if (time) updatedEvent.time = time;

  if (imageUrl) updatedEvent.imageUrl = imageUrl;

  const speaker = formData.get("speaker") as string;
  if (speaker) updatedEvent.speaker = speaker;

  await updateEvent(id, updatedEvent);

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events?success=Event+updated+successfully");
}
