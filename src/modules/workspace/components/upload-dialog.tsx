import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUploadForm } from '../store';
import UploadForm from './upload-form';

const UploadDialog = () => {
    const { isUploadForm, setIsUploadForm } = useUploadForm();

    const handleCloseForm = () => {
        setIsUploadForm();
    }

    return (
        <Dialog open={isUploadForm} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Upload files here!</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        Start uploading and managing you data seamlessly !
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-center items-start w-full min-h-auto'>
                    <UploadForm/>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UploadDialog