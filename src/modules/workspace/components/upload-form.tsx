"use client";

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { useUploadForm } from '../store';
import { useUploadMedia } from '../hooks/upload';
import { LoaderCircle } from 'lucide-react';
import { Media } from '../types/media-types';
import { UploadFileDataProp } from '../types';

const UploadForm = () => {
    const { isUploadForm, setIsUploadForm } = useUploadForm();
    const { mutateAsync, data, error, isPending } = useUploadMedia();
    const [file, setFile] = useState<File | null>(null);
    const [mediaCategory, setMediaCategory] = useState<string>("");
    const handleCloseForm = () => {
        setIsUploadForm();
    }

    const HandleSongUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formEvent = e.currentTarget;
        const formData = new FormData(formEvent);

        if (!file) {
            toast.error("Some fields missing!");
            return;
        }

        formData.append("file", file)

        const data = Object.fromEntries(formData.entries()) as unknown as UploadFileDataProp;
        const res = await mutateAsync(data);

        if (res.success) {
            toast.success(res.message)
            formEvent.reset();
        } else {
            toast.message(res.error);
        }

        setIsUploadForm();

        console.log(data)
    }
    return (
        <form onSubmit={HandleSongUpload} className='w-full min-h-auto py-2 px-3 flex justify-center items-center flex-col gap-3'>
            <div className='w-full flex flex-col justify-center items-start'>
                <Label className='font-sans text-[13px] tracking-[-0.4px] font-light flex gap-[2px]'><p>upload file</p> <span className='text-center text-red-400 text-[15px]'>*</span></Label>
                <Input autoComplete='off' onChange={(e) => setFile(e.target.files?.[0] || null)} required type='file' placeholder='choose an audio file...' />
            </div>
            <div className='w-full flex flex-col justify-center items-start'>
                <Label className='font-sans text-[13px] tracking-[-0.4px] font-light flex gap-[2px]'><p>title</p> <span className='text-center text-red-400 text-[15px]'>*</span></Label>
                <Input autoComplete='off' required type='text' name='title' placeholder='title' />
            </div>
            <div className='w-full flex flex-col justify-center items-start gap-[2px]'>
                <Label className='font-sans text-[13px] tracking-[-0.4px] font-light flex gap-[2px]'><p>description</p></Label>
                <Input autoComplete='off' type='text' name='description' placeholder='decription' />
            </div>
            {/* <div className='w-full flex flex-col justify-center items-start gap-[2px]'>
                <Label className='font-sans text-[13px] tracking-[-0.4px] font-light flex gap-1'><p>file category</p> <span className='text-center text-red-400 text-[18px]'>*</span></Label>
                <Select value={mediaCategory} onValueChange={setMediaCategory}>
                    <SelectTrigger id="category" className="w-[150px]">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(Media).map((key) => (
                            <SelectItem key={key} value={key}>
                                {key.replaceAll("_", " ")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div> */}

            <div className='w-full flex justify-between items-center'>
                <div className='w-[50%] flex justify-start'>
                    {isPending && <LoaderCircle className='animate-spin dark:text-[#f3f3f3] text-zinc-400' />}
                </div>
                <DialogFooter>
                    <Button onClick={() => handleCloseForm()} type="button" variant="outline" className='rounded-[6px]'>
                        Cancel
                    </Button>
                    <Button type='submit' className='rounded-[6px]'>
                        Upload
                    </Button>
                </DialogFooter>
            </div>
        </form>
    )
}

export default UploadForm