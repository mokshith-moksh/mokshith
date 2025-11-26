import WindowWrapper from "#hoc/windowWrapper";
import { RootState } from "#store/store";
import { useSelector } from "react-redux";
const TextViewer = () => {
  const fileContent = useSelector(
    (state: RootState) => state.windows.windows.txtfile.data
  );
  return <p className="text-black p-5">{fileContent}</p>;
};
const TextViewerWindow = WindowWrapper(TextViewer, "txtfile");
export default TextViewerWindow;
