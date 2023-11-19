import { useContext } from "react";
import { AuthContext, AuthContextProps } from "./auth";

export function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);

    return context;
};