import { useContext } from "react";
import { MyAppContext } from "@/contextApi/appContext";

export default function useAppContext() {
  return useContext(MyAppContext);
}
