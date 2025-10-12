export const Media = {
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
    APPLICATION: "APPLICATION, ex : .ppt, .pdf",
    TEXT: "TEXT ex : .txt",
    AUDIO: "AUDIO"
} as const;

export type Media = keyof typeof Media
