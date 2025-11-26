import WindowWrapper from "#hoc/windowWrapper";
import { RootState } from "#store/store";
import { useSelector } from "react-redux";

const ImageViewer = () => {
  const { data } = useSelector(
    (state: RootState) => state.windows.windows.imgfile
  );
  // @ts-ignore
  return <img src={data?.imageUrl} />;
};
const ImageViewerWindow = WindowWrapper(ImageViewer, "imgfile");
export default ImageViewerWindow;
