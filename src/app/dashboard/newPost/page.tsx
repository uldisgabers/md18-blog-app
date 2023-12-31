import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import style from "./page.module.css";
import NewPostForm from "@/app/components/NewPostForm/NewPostForm";
import AddTagForm from "@/app/components/AddTagForm/AddTagForm";
import DeleteTag from "@/app/components/DeleteTag/DeleteTag";

export default async function NewPost() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className={style.main}>
      <NewPostForm />
      <AddTagForm />
      <DeleteTag />
    </main>
  );
}
