"use client";

import { useGetMedia } from '@/modules/workspace/hooks/workspace';
import { useUser } from '@clerk/nextjs';
import { AudioIcon, DocIcon, ImageIcon, TxtIcon, VideoIcon } from '@/modules/workspace/components/Image-icon';
import { ChevronDown, ChevronRight, EllipsisVertical, Info, Plus, Airplay, LoaderCircle } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import UploadDialog from '@/modules/workspace/components/upload-dialog';
import { useMediaDetails, useMediaView, useUploadForm, useWorkspaceDiaglog } from '@/modules/workspace/store';
import WorkspaceDialog from '@/modules/workspace/components/workspace-dialog';
import { Media } from '@/modules/workspace/types/media-types';

const Home = () => {
    const { data, error, isPending } = useGetMedia();
    const { isUploadForm, setIsUploadForm } = useUploadForm();
    const { isWorkspaceDiaglog, setWorkspaceDiaglog } = useWorkspaceDiaglog();
    const { media, setMedia } = useMediaDetails();
    const [openMedia, setOpenMedia] = useState(true);
    const user = useUser();
    const [mediaView, setMediaView] = useState<string>("")

    const HandleMediaView = (val: any) => {
        setMedia(val)
        setWorkspaceDiaglog();
    }
    return (
        <div className='w-full'>
            <div className='min-h-[5vh] g-white w-full flex justify-between items-center px-3'>
                <h1 className='text-2xl font-semibold'>WellCome Back, {user?.user?.firstName}&nbsp;!</h1>
                <div className=''>
                    <Info className='h-4 w-4' />
                </div>
            </div>

            <div className={`flex items-center gap-2 px-10 py-10`}>
                <div className='flex gap-2' onClick={() => setOpenMedia(!openMedia)}>
                    <div className='rounded-xl dark:bg-zinc-800 bg-[#f3f3f3] px-[8px] py-[8px]'>
                        <ChevronDown className={`justify-center items-center h-4 w-4 ${!openMedia && "hidden"}`} />
                        <ChevronRight className={`justify-center items-center h-4 w-4 ${openMedia && "hidden"}`} />
                    </div>
                    <p className='text-[14px] tracking-[-0.3px] py-1 px-3 dark:bg-zinc-800 bg-[#f3f3f3] rounded-xl font-sans dark:text-zinc-300 '>Your uploaded media</p>
                </div>
                <div onClick={setIsUploadForm} className='border border-zinc-500 dark:border-zinc-500 border-dashed rounded-[6px] px-[5px] py-[5px] dark:bg-zinc-900 bg-[#f3f3f3] dark:hover:bg-zinc-600/40 hover:bg-white'>
                    <Plus size={18} />
                </div>
            </div>

            {
                (openMedia && !isPending) ? (
                    <div className='w-full bg-white dark:bg-[#09090B] min-h-[70vh] px-5'>
                        <div className='min-h-[70vh] w-full flex'>
                            {data?.data?.length || -1 > 0 ? (
                                <div className='flex flex-col w-full px-5'>
                                    <div className='flex w-full px-7 py-7'>
                                        <div className='w-[33%]'>
                                            <p>Name</p>
                                        </div>
                                        <div className='w-[33%]'>
                                            <p>Owner</p>
                                        </div>
                                        <div className='w-[33%]'>
                                            <p>Date of Creation</p>
                                        </div>
                                        <div>
                                            <p>Info</p>
                                        </div>
                                    </div>
                                    {data?.data?.map((val) => (
                                        <div key={val.id} className='flex w-full flex-col items-center justify-center hover:bg-[#f9f9f9] dark:hover:bg-[#2b2b2b]'>
                                            <div className='bg-[#cecece] dark:bg-white/20 h-[0.5px] w-full' />
                                            <div className='flex w-full px-10 py-4' onClick={() => {
                                                console.log(val)
                                                HandleMediaView(val)
                                            }}>
                                                <div className='w-[33%] flex items-center gap-2'>
                                                    {Media.IMAGE === val.media_type && <><ImageIcon className='h-5 w-5 rounded-[3px] text-zinc-400 dark:text-[#f3f3f3] bg-white' /> <p>{val.title}</p></>}
                                                    {Media.VIDEO === val.media_type && <><Image width={20} height={20} alt='video' src={'/video.png'} className='h-5 w-5 rounded-[3px] text-zinc-400 dark:text-[#f3f3f3] bg-white' /> <p>{val.title}</p></>}
                                                    {Media.AUDIO === val.media_type && <><Image width={20} height={20} src={'/audio.png'} alt='audio' className='h-5 w-5 rounded-[3px] text-zinc-400 dark:text-[#f3f3f3] bg-white' /> <p>{val.title}</p></>}
                                                    {Media.APPLICATION === val.media_type && <><DocIcon className='h-5 w-5 rounded-[3px] text-zinc-400 dark:text-[#f3f3f3] bg-white' /> <p>{val.title}</p></>}
                                                    {Media.TEXT === val.media_type && <><TxtIcon className='h-5 w-5 rounded-[3px] text-zinc-400 dark:text-[#f3f3f3] bg-white' /> <p>{val.title}</p></>}
                                                </div>
                                                <div className='w-[35%] flex gap-2 items-center'>
                                                    <Image className='rounded-full' width={30} height={30} src={user?.user?.imageUrl || ""} alt='owner'></Image>
                                                    <p className='text-[15px]'>{user?.user?.firstName}</p>
                                                </div>
                                                <div className='w-[36%]'>
                                                    <p>{new Date(val.createdAt).toDateString()}</p>
                                                </div>
                                                <div className='flex justify-center items-center'>
                                                    <p><EllipsisVertical className='h-4 w-4' /></p>
                                                </div>
                                            </div>
                                            <div className='bg-[#cecece] dark:bg-white/20 h-[0.5px] w-full' />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='flex flex-col justify-center items-center w-full'>
                                    <Airplay className='text-zinc-400 dark:text-[#e1e1e1]' />
                                    <p className='text-zinc-400 dark:text-[#e1e1e1] text-[14px] font-sans font-medium tracking-[-0.4px]'>Nothing to display !</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    (isPending && (
                        <div className='w-full bg-white dark:bg-[#09090B] min-h-[70vh] px-5 flex justify-center items-center'>
                            <LoaderCircle className='animate-spin dark:text-[#f3f3f3] text-zinc-400' />
                        </div>
                    ))
                )
            }
            <WorkspaceDialog />
            <UploadDialog />
        </div>
    )
}

export default Home;