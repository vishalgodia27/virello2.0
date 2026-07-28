// "use client"
// import React, { useEffect } from "react";
// import Header from "./_components/Headers";
// import { useMutation } from "convex/react";
// import { api } from '@/convex/_generated/api';
// import { useUser } from "@clerk/nextjs";

// function Provider({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const CreateUser = useMutation((api as any).user.CreateNewUser);
//   const {user}=useUser();
//   useEffect(()=>{

//   })
//   const CreateNewUser = async () => {
//     if(user)
//     {
//     const result=await CreateUser({
//       emai:user?.primaryEmailAddress?.emailAddress,
//       imageUrl:user?.imageUrl,
//       name:user?.fullName??''

//     });
//     }


//   };

//   return (
//     <div>
//       <Header />
//       {children}
//     </div>
//   );
// }

// export default Provider;
"use client";

import React, { useEffect } from "react";
import Header from "./_components/Headers";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const createUser = useMutation(api.user.CreateNewUser);
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
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;