import { BsPlus, BsSendArrowUp } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { TbMicrophone } from "react-icons/tb";
import React, { useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const MediaSection = () => {

  const [showInputMedia, setShowInputMedia] = useState<any>({ image: false, audio: false });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePickMedia = () => {
    setShowInputMedia((show: any) => {
      return { ...show, image: !show.image };
    });
    setFileList([]);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button className="w-[60px] h-[60px] flex flex-col items-center justify-center bg-none" type="button">
      <BsPlus className="text-white w-8 h-8" />
      <div className="text-white text-xs">Upload</div>
    </button>
  );

  console.log(fileList);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center p-2">
        <div className="h-10 w-max flex gap-4 justify-center items-center">
          <MdOutlineAddPhotoAlternate onClick={() => handlePickMedia()} className="w-10 h-10 text-white cursor-pointer"/>
          <TbMicrophone onClick={() => handlePickMedia()} className="w-10 h-10 text-white cursor-pointer"/>
        </div>
        <button><BsSendArrowUp className="w-10 h-10 p-1 text-black bg-white border active:border-white active:text-white active:bg-transparent rounded-md cursor-pointer items-start"/></button>
      </div>
      <div className="px-2">
        { showInputMedia.image &&
          <Upload
            listType="picture-card"
            // fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
          >
            { fileList.length < 1 ? uploadButton : null }
          </Upload>
        }
      </div>
    </div>
  )
}

export default MediaSection;