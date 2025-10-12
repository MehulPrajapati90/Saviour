"use client";

import React, { useEffect } from "react";
import { useOnboardUser } from "@/modules/auth/hooks/user";

const Home = () => {
    const { mutateAsync, data, error, isPending } = useOnboardUser();

    useEffect(() => {
        mutateAsync();
    }, [mutateAsync]);

    return (
        <div className="w-full min-h-auto">

        </div>
    );
};

export default Home;