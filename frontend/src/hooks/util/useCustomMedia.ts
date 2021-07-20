import { useMediaQuery } from "react-responsive";
import { sizes } from "styles/media";

export default function useCustomMedia(device: keyof typeof sizes) {
  const media = useMediaQuery({
    query: `(min-width: ${sizes[device]}px)`,
  });

  return media;
}
