'use server';

import { signInProps, SignUpParams } from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: signInProps) =>{
    try {
        const { account } = await createAdminClient();

        const response = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(response);
    } catch (e) {
        console.error('Error', e);
    }
}

export const signUp = async (userData : SignUpParams) =>{

    const {email, password, firstName, lastName} = userData;

    try {
        //Create a user account
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(
            email, 
            password
        );

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (e) {
        console.error('Error', e);
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();

      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }
  


export const logoutAccount = async () =>{

    try {
        const {account} = await createSessionClient();

        (await cookies()).delete("appwrite-session");

        await account.deleteSession("current");
    } catch (error) {
        
    }
}