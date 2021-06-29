import { useCallback, useEffect, useState } from "react";
import useUpload from "hooks/util/useUpload";
import getFileName from "lib/getFileName";
import { RootState } from "modules";
import { useSelector } from "react-redux";
import usePostIdx from "hooks/util/usePostIdx";

export default function usePostThumbnail(changeRequestHandler: (name: string, value: any) => void) {
  const { post } = useSelector((state: RootState) => state.posts.data);

  const { imageEl, handleUploadImage } = useUpload();
  const postIdx = usePostIdx();

  const [thumbnail, setThumbnail] = useState<string>("");

  const handleChangeThumbnail = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      const url: string = await handleUploadImage(files);
      setThumbnail(url);
      changeRequestHandler("thumbnail", getFileName(url));
    },
    [changeRequestHandler, handleUploadImage]
  );

  const handleDeleteThumbnail = useCallback(() => {
    setThumbnail("");
    changeRequestHandler("thumbnail", "");
  }, [changeRequestHandler]);

  useEffect(() => {
    if (postIdx) {
      setThumbnail(post.thumbnail);
    }
  }, [post, postIdx]);

  useEffect(() => {
    return () => setThumbnail("");
  }, []);

  return {
    imageEl,
    thumbnail,
    handleChangeThumbnail,
    handleDeleteThumbnail,
  };
}
