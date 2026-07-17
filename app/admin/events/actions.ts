"use server";

import { addEvent, updateEvent } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEventAction(formData: FormData, imageUrl?: string) {
  const newEvent = {
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    status: formData.get("status") as string,
    date: formData.get("date") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    link: formData.get("link") as string,
    imageUrl: imageUrl || undefined,
  };

  await addEvent(newEvent);

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events?success=Event+created+successfully");
}

export async function updateEventAction(id: number, formData: FormData, imageUrl?: string) {
  const updatedEvent = {
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    status: formData.get("status") as string,
    date: formData.get("date") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    link: formData.get("link") as string,
    imageUrl: imageUrl || undefined,
  };

  await updateEvent(id, updatedEvent);

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events?success=Event+updated+successfully");
}
