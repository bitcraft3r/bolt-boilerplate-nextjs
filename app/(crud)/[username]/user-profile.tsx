"use client";

import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useQuery } from "convex/react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/convex/_generated/api";

export function UserProfile({ username }: { username: string }) {
    const user = useQuery(api.users.get, { username });
    return user == null ? null : (
        <div className="profile p-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>@{user.username}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Avatar className="h-28 w-28 border-4 border-neutral-200 dark:border-neutral-800">
                        <AvatarImage src={user.imageUrl} alt="profile pic" />
                    </Avatar>
                </CardContent>
            </Card>
        </div>
    );
}


