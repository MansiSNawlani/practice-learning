"use client"

import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export function  OnboardingClient({userId}){
    const router = useRouter();
    useEffect(()=> {
        const intervalId = setInterval(async () => {
            const user = await getUsers(userId)
            if (user == null) return

            router.replace("/app")
        }, 250)
    }, [userId])
    return <Loader2Icon className="animate-spin size-24"/>

}