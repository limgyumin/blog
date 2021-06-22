import { useCallback, useEffect, useState } from "react";
import useUpload from "hooks/util/useUpload";
import getFileName from "lib/getFileName";
import { RootState } from "modules";
import { useSelector } from "react-redux";
import usePostIdx from "hooks/util/usePostIdx";

export default function usePostThumbnail(changeRequestHandler: (name: string, value: any) => void) {
  const { post } = useSelector((state: RootState) => state.posts.data);

  const { imageEl, uploadHandler } = useUpload();
  const postIdx = usePostIdx();

  const [thumbnail, setThumbnail] = useState<string>("");

  const onChangeThumbnail = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      const url: string = await uploadHandler(files);
      setThumbnail(url);
      changeRequestHandler("thumbnail", getFileName(url));
    },
    [changeRequestHandler, uploadHandler]
  );

  const onRemoveThumbnail = useCallback(() => {
    setThumbnail("");
    changeRequestHandler("thumbnail", "");
  }, [changeRequestHandler, setThumbnail]);

  useEffect(() => {
    if (postIdx) {
      setThumbnail(post.thumbnail);
    }
  }, [post, postIdx]);

  return {
    imageEl,
    thumbnail,
    onChangeThumbnail,
    onRemoveThumbnail,
  };
}
