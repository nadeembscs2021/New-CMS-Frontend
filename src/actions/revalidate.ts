// app/actions/revalidate.ts
"use server";

import { revalidatePath } from "next/cache";

export async function revalidateList(pathToRevalidate: string) {
  revalidatePath(pathToRevalidate);
}
