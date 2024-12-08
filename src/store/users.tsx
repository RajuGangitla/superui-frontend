import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { User } from "@/types/signup";


export type AuthState = {
    user: User | null;
    signIn: (user: User) => void;
    signOut: () => void;
};

const userStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                signIn: (user) => {
                    set((state) => ({
                        ...state,
                        user,
                        loggedIn: true,
                        lastAuthCheck: Date.now(),
                    }));
                },
                action: (st: string) =>
                    set((state) => ({
                        ...state,
                        currentAction: st,
                    })),
                signOut: () =>
                    set((state) => ({
                        ...state,
                        loggedIn: false,
                        user: null,
                        lastAuthCheck: 0,
                    })),
            }),
            {
                name: "auth-storage", // unique name for the storage item
            }
        )
    )
);

export default userStore;