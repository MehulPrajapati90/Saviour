import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { GetMedia, UploadFileData } from "../actions";
import { UploadFileDataProp } from "../types";

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