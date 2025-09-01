import type { JSX } from "react";

export default interface IRecipes {
    id: number,
    title: string,
    image: string,
    imageType: string
}
export  interface ISummary {
    id: number,
    title: string,
    summary: string
}
export interface ProtectedRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}