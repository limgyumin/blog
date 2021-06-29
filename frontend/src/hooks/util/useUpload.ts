import { useCallback, useRef } from "react";
import { uploadImage } from "lib/uploadImage";
import { toast } from "react-toastify";
import { IUploadFileResponse } from "types/upload.type";

export default function useUpload() {
  const imageEl = useRef<HTMLInputElement>(null);

  const handleInitImage = useCallback((): void => {
    imageEl.current.value = "";
  }, [imageEl]);

  const handleUploadImage = useCallback(
    async (files: FileList): Promise<string> => {
      try {
        if (!files || !files.length) return;

        const file: File = files[0];

        const { data }: IUploadFileResponse = await uploadImage(file);
        const url: string = data.files[0];

        handleInitImage();

        return url;
      } catch (err) {
        toast.error("이미지를 업로드하는 중에 오류가 발생했어요...");
      }
    },
    [handleInitImage]
  );

  return {
    imageEl,
    handleUploadImage,
  };
}
