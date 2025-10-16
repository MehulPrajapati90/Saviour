export const Media = {
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
    APPLICATION: "APPLICATION",
    TEXT: "TEXT",
    AUDIO: "AUDIO"
} as const;

export type Media = keyof typeof Media
