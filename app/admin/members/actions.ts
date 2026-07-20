"use server";

import { getMembers, addMember, updateMember, deleteMember, Member } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getMembersAction() {
  return await getMembers();
}

export async function addMemberAction(data: Omit<Member, "id">) {
  await addMember(data);
  revalidatePath("/admin/members");
  revalidatePath("/members");
}

export async function updateMemberAction(id: number, data: Partial<Member>) {
  await updateMember(id, data);
  revalidatePath("/admin/members");
  revalidatePath("/members");
}

export async function deleteMemberAction(id: number) {
  await deleteMember(id);
  revalidatePath("/admin/members");
  revalidatePath("/members");
}

export async function updateMembersOrderAction(updates: { id: number; order: number }[]) {
  const { updateMembersOrder } = await import("@/lib/db");
  await updateMembersOrder(updates);
  revalidatePath("/admin/members");
  revalidatePath("/members");
}
