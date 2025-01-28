import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await auth(); 

    if (!user || !user.userId) {
        const authInstance = await auth(); 
        authInstance.redirectToSignIn();  
        return;
    }
    
    const { sessionClaims } = await auth();
    const { room } = await req.json();

    if (!sessionClaims?.email || !sessionClaims?.fullName || !sessionClaims?.image) {
        return NextResponse.json({ message: "No data about the user" }, { status: 400 });
    }
    const session = liveblocks.prepareSession(sessionClaims.email, {
        userInfo: {
            name: sessionClaims?.fullName,
            email: sessionClaims?.email,
            avatar: sessionClaims?.image
        },
    });

    const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims.email)
    .get();

    if (usersInRoom.empty) {
        return NextResponse.json({ message: "Niste u ovoj sobi" }, { status: 403 });
    }

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
    if (!userInRoom) {
        return NextResponse.json({ message: "Niste u ovoj sobi" }, { status: 403 });
    }

    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, { status });
}
