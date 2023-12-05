import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { AppDispatch, ApplicationRootState } from "./store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ApplicationRootState> = useSelector