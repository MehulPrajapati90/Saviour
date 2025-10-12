"use server";

import { currentUser } from "@clerk/nextjs/server";
import { UploadFileDataProp } from "../types";
import { client } from "@/lib/db";
import { UploadApplicationFiletoCloudinary, UploadAudiotoCloudinary, UploadImagestoCloudinary, UploadTextFiletoCloudinary, UploadVideotoCloudinary } from "./cloudinary";

// upload in one go.
export const UploadFileData = async (data: UploadFileDataProp) => {
    try {
        const { file, title, description, category } = data;
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const dbuser = await client.user.findUnique({
            where: {
                clerkId: user.id
            }
        })

        let upload;
        if (file.type.startsWith('image/')) {
            upload = await UploadImagestoCloudinary({ file })
        } else if ((file.type.startsWith('audio/'))) {
            upload = await UploadAudiotoCloudinary({ file })
        } else if ((file.type.startsWith('video/'))) {
            upload = await UploadVideotoCloudinary({ file })
        } else if ((file.type.startsWith('text/'))) {
            upload = await UploadTextFiletoCloudinary({ file })
        } else if ((file.type.startsWith('application/'))) {
            upload = await UploadApplicationFiletoCloudinary({ file })
        } else {
            return {
                success: false,
                error: "Not supported file formate!"
            }
        }

        // @ts-ignore
        const duration = upload?.duration ? upload?.duration : 0;
        const saveData = await client.store.create({
            data: {
                userId: dbuser?.id || '',
                media_type: category,
                media_url: upload?.url || '',
                durationSec: duration,
                title: title,
                description: description,
                size: Number(upload?.size)
            }
        })

        return {
            success: true,
            message: "uploaded successfully!"
        }

    } catch (e: any) {
        console.error("Upload error:", e);
        return { success: false, error: e.message || "Failed to upload" };
    }
}

export const GetMedia = async () => {
    const user = await currentUser();
    try {
        const dbuser = await client.user.findUnique({
            where: {
                clerkId: user?.id
            }
        })

        if (!dbuser) {
            return {
                success: false,
                error: "User not authenticated!"
            }
        }

        const fetchMedia = await client.store.findMany({
            where: { userId: dbuser?.id },
            orderBy: { createdAt: "desc" },
        })

        if (!fetchMedia) {
            return {
                success: false,
                error: "Error Fetching Data!"
            }
        }

        return {
            success: true,
            data: fetchMedia || [],
            message: "Data Fetched Successfully!"
        }
    } catch (e) {
        console.error("Error Fetching Data!");
        return {
            success: false,
            error: "Error Fetching Data!"
        }
    }
}