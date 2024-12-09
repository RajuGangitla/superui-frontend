import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
    const WrappedComponent: React.FC<P> = (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem("superui-token");
            if (!token) {
                router.push("/signup");
            }
        }, [router]);

        const token = typeof window !== "undefined" ? localStorage.getItem("superui-token") : null;

        return token ? <Component {...props} /> : null;
    };

    return WrappedComponent;
};

export default AuthGuard;

