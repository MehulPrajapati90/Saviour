import { Media } from "@prisma/client";

export interface UploadResultImage {
    success: boolean;
    url?: string;
    size?: number;
    error?: string;
    media?: String;
}

export interface UploadResultAudio {
    success: boolean;
    url?: string;
    size?: number;
    error?: string;
    media?: string;
    duration?: number
}

export interface UploadResultTextFile {
    success: boolean;
    url?: string;
    size?: number;
    error?: string;
    media?: string;
    duration?: number
}

export interface UploadResultVideo {
    success: boolean;
    url?: string;
    size?: number;
    error?: string;
    media?: string;
    duration?: number
}

export interface UploadResultApplicationFile {
    success: boolean;
    url?: string;
    size?: number;
    error?: string;
    media?: string;
    duration?: number
}

export interface UploadDataAudio {
    file: File;
}

export interface UploadDataImage {
    file: File;
}

export interface UploadDataText {
    file: File;
}

export interface UploadDataVideo {
    file: File
}

export interface UploadDataApplication {
    file: File
}

export interface UploadFileDataProp {
    file: File;
    title: string;
    description: string
    category?: Media
}