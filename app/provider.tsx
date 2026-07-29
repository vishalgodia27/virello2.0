
"use client";

import React, { useEffect, useState } from "react";
import Header from "./_components/Headers";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const createUser = useMutation(api.user.CreateNewUser);
  const [UserDetail,setUserDetail]=useState<any>();
  const { user } = useUser();

  const createNewUser = async () => {
    if (!user) return;

    await createUser({
      email: user.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      name: user.fullName ?? "",
    });
  };

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  return (
    <UserDetailContext.Provider value={{UserDetail,setUserDetail}}>

    <div>

      <Header />
      {children}
    </div>
    </UserDetailContext.Provider >
  );
}

export default Provider;