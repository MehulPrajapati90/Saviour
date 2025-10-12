import { create } from "zustand";

type UploadType = {
    isUploadForm: boolean,
    setIsUploadForm: () => void
}

export const useUploadForm = create<UploadType>()((set) => ({
    isUploadForm: false,
    setIsUploadForm: () => set((state) => ({ isUploadForm: !state.isUploadForm }))
}))
