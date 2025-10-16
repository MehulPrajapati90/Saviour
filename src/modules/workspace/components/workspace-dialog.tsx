"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import React from 'react'
import { useMediaDetails, useMediaView, useWorkspaceDiaglog } from '../store'
import Image from 'next/image';
import { Media } from '../types/media-types';
import { DownloadIcon } from 'lucide-react';
import { AudioPlayer } from './audioplayer';

const WorkspaceDialog = () => {
    const { isWorkspaceDiaglog, setWorkspaceDiaglog } = useWorkspaceDiaglog();
    const { mediaId, setMediaId, mediaUrl, setMediaUrl } = useMediaView();
    const { media, setMedia } = useMediaDetails();
    const handleCloseForm = () => {
        setWorkspaceDiaglog();
    }

    const handleDownload = async () => {
        try {
            const res = await fetch(media?.media_url || "");
            const blob = await res.blob();
            const a = Object.assign(document.createElement("a"), {
                href: URL.createObjectURL(blob),
                download: `${media?.title}`,
            });
            a.click();
            URL.revokeObjectURL(a.href);
        } catch (err) {
            console.error("Download failed:", err);
        }
    };

    return (
        <Dialog open={isWorkspaceDiaglog} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Media Details!</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        View you media Details, and start uploading on Saviour!
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-center items-start w-full min-h-auto'>
                    {/* Image */}
                    <div className='w-full flex justify-center items-center'>
                        {media.media_type === Media.IMAGE && <Image width={20} height={20} src={media?.media_url} quality={100} unoptimized alt='media' className='w-[250px]' />}
                        {media.media_type === Media.VIDEO && <video width={20} height={20} src={media?.media_url} controls autoPlay className='w-[500px]' />}
                        {media.media_type === Media.AUDIO && <AudioPlayer src={media.media_url} className='w-[350px]' />}
                        {media.media_type === Media.APPLICATION && <iframe width={20} height={20} src={media?.media_url} className='w-[360px] h-10' />}
                        {media.media_type === Media.TEXT && <iframe width={20} height={20} src={media?.media_url} className='w-[360px] h-10' />}
                    </div>

                    {/* Details */}
                    <div className='flex flex-col justify-center items-start w-full min-h-auto pt-5'>
                        <h2 className='text-[18px] font-sans font-normal tracking-[-0.4px]'>File Details</h2>

                        <div className='w-full min-h-auto flex flex-col justify-between items-start px-3 pt-5 gap-3'>
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px]'>Title</h2>
                                    <h3 className='text-[12.5px] font-sans font-light'>{media.title}</h3>
                                </div>
                                <div className='text-right'>
                                    <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px]'>Uploaded At</h2>
                                    <h3 className='text-[12.5px] font-sans font-light'>{new Date(media.createdAt).toDateString()}</h3>
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px]'>Description</h2>
                                    <h3 className='text-[12.5px] font-sans font-light'>{media.description}</h3>
                                </div>
                                <div onClick={handleDownload} className='cursor-pointer text-right flex gap-2 justify-center items-center'>
                                    <button className='text-[12.5px] font-sans font-light hover:text-blue-500 transition-all ease-in-out duration-200'><DownloadIcon size={16} /></button>
                                    <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px] hover:text-blue-500 transition-all ease-in-out duration-200'>Download</h2>
                                </div>
                            </div>
                            <div className=''>
                                <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px]'>Size</h2>
                                <h3 className='text-[12.5px] font-sans font-light'>{Math.round(Number(media.size)/1024) < 1024? Math.round(Number(media.size)/1024) + " KB" : Math.round(Number(media.size)/1048576) + " MB"}</h3>
                            </div>
                            <div className=''>
                                <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px]'>Type</h2>
                                <h3 className='text-[12.5px] font-sans font-light'>{media.media_type}</h3>
                            </div>
                            {media.media_type !== Media.VIDEO ? (
                                <div className=''>
                                    <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px]'>Duration</h2>
                                    <h3 className='text-[12.5px] font-sans font-light'>{media.media_type === Media.AUDIO ? Math.round(Number(media.durationSec) / 60) + " min" : "N/A"}</h3>
                                </div>
                            ) : (

                                <div className=''>
                                    <h2 className='text-[15px] font-sans font-normal tracking-[-0.2px]'>Duration</h2>

                                    {media.media_type === Media.VIDEO && <h3 className='text-[12.5px] font-sans font-light'>{media.media_type === Media.VIDEO ? Math.round(Number(media.durationSec)) + " min" : "N/A"}</h3>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default WorkspaceDialog;