import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { DeleteMedia, GetMedia, UploadFileData } from "../actions";
import { DeleteMediaProps, UploadFileDataProp } from "../types";

export const useGetMedia = () => {
    return useQuery({
        queryKey: ['media'],
        queryFn: async () => GetMedia()
    })
}

export const useUploadMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UploadFileDataProp) => UploadFileData(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media'] })
        }
    })
}

export const useDeleteMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: DeleteMediaProps) => DeleteMedia(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media'] })
        }
    })
}