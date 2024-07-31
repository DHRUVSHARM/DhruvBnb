import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId } from "@/app/lib/actions";
import React from "react";
import { useState, useEffect } from "react";
import { UserType } from "../page";


export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}

const ConversationPage = async ({ params }: { params: { id: string } }) => {

    const userId = await getUserId()

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated ...</p>
            </main>
        )
    }


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail></ConversationDetail>
        </main>
    );
}

export default ConversationPage;