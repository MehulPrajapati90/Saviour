import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Media } from "../types/media-types";

type UploadType = {
    isUploadForm: boolean,
    setIsUploadForm: () => void
}

type WorkspaceDialogType = {
    isWorkspaceDiaglog: boolean,
    setWorkspaceDiaglog: () => void
}

type MediaViewState = {
    mediaId: string;
    mediaUrl: string;
    setMediaId: (id: string) => void;
    setMediaUrl: (id: string) => void;
}

type MediaDataState = {
    title: string;
    description: string;
    durationSec: Number;
    size: Number;
    media_type: Media;
    media_url: string;
    createdAt: Date
}

type MediaDetailsState = {
    media: MediaDataState;
    setMedia: (data: MediaDataState) => void
}

export const useUploadForm = create<UploadType>()((set) => ({
    isUploadForm: false,
    setIsUploadForm: () => set((state) => ({ isUploadForm: !state.isUploadForm }))
}))

export const useWorkspaceDiaglog = create<WorkspaceDialogType>()((set) => ({
    isWorkspaceDiaglog: false,
    setWorkspaceDiaglog: () => set((state) => ({ isWorkspaceDiaglog: !state.isWorkspaceDiaglog }))
}))

export const useMediaView = create<MediaViewState>()(persist(
    (set) => ({
        mediaId: "",
        mediaUrl: "",
        setMediaId: (id: string) => set(() => ({ mediaId: id })),
        setMediaUrl: (url: string) => set(() => ({ mediaUrl: url }))
    }),
    {
        name: "media"
    }
))

export const useMediaDetails = create<MediaDetailsState>()(persist(
    (set) => ({
        // @ts-ignore
        media: {},
        setMedia: (data: MediaDataState) => set(() => ({ media: data }))
    }),
    {
        name: "media"
    }
))