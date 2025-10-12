"use server";

import { v2 as cloudinary } from "cloudinary";
import { UploadDataApplication, UploadDataAudio, UploadDataImage, UploadDataText, UploadDataVideo, UploadResultApplicationFile, UploadResultAudio, UploadResultImage, UploadResultTextFile, UploadResultVideo } from "../types";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
    timeout: 60000,
});

export const UploadAudiotoCloudinary = async ({ file }: UploadDataAudio): Promise<UploadResultAudio> => {
    try {
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        if (!file.type.startsWith("audio/")) {
            return { success: false, error: "Only audio files are allowed" };
        }

        const arrayBuffer = await file.arrayBuffer();
        const base64Str = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Str, {
            resource_type: "video",
            folder: "songs",
        });

        return {
            success: true,
            url: uploadResult.secure_url,
            size: file.size,
            duration: uploadResult.duration,
            media: "AUDIO"
        };
    } catch (error: any) {
        console.error("Cloudinary audio upload error:", error);
        return { success: false, error: error.message || "Failed to upload" };
    }
};

export const UploadImagestoCloudinary = async ({ file }: UploadDataImage): Promise<UploadResultImage> => {
    try {
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        if (!file.type.startsWith("image/")) {
            return { success: false, error: "Only image files are allowed" };
        }

        const arrayBuffer = await file.arrayBuffer();
        const base64Str = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Str, {
            resource_type: "image",
            folder: "uploads",
            transformation: [
                { width: 1200, crop: "limit" },
                { fetch_format: "auto", quality: "auto" },
            ],
        });

        const optimizedUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: "auto",
            quality: "auto",
        });

        return {
            success: true,
            url: optimizedUrl,
            size: file.size,
            media: "IMAGE"
        };
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return { success: false, error: error.message || "Failed to upload" };
    }
};


export const UploadTextFiletoCloudinary = async ({ file }: UploadDataText): Promise<UploadResultTextFile> => {
    if (!file) {
        return { success: false, error: "No file provided" };
    }

    if (!file.type.startsWith("text/")) {
        return { success: false, error: "Only text files are allowed" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const base64Str = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Str, {
            resource_type: "raw",
            folder: "uploads/text-files",
        });

        return {
            success: true,
            url: uploadResult.secure_url,
            size: file.size,
            media: "TEXT"
        };
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return { success: false, error: error.message || "Failed to upload" };
    }

}

export const UploadVideotoCloudinary = async ({ file }: UploadDataVideo): Promise<UploadResultVideo> => {
    if (!file) {
        return { success: false, error: "No file provided" };
    }

    if (!file.type.startsWith("video/")) {
        return { success: false, error: "Only video files are allowed" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const base64Str = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Str, {
            resource_type: "video",
            folder: "uploads/videos",
            chunk_size: 6000000,
            eager: [
                { width: 1280, height: 720, crop: "limit", format: "mp4" },
            ],
        });

        const optimizedUrl = uploadResult.eager?.[0]?.secure_url || uploadResult.secure_url;

        return {
            success: true,
            url: optimizedUrl,
            size: file.size,
            media: "VIDEO"
        };
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return { success: false, error: error.message || "Failed to upload" };
    }
}

export const UploadApplicationFiletoCloudinary = async ({ file }: UploadDataApplication): Promise<UploadResultApplicationFile> => {
    if (!file) {
        return { success: false, error: "No file provided" };
    }

    if (!file.type.startsWith("application/")) {
        return { success: false, error: "Only application files are allowed" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const base64Str = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Str, {
            resource_type: "raw",
            folder: "uploads/applications",
        });

        return {
            success: true,
            url: uploadResult.secure_url,
            size: file.size,
            media: "APPLICATION"
        };
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return { success: false, error: error.message || "Failed to upload" };
    }
}