import { useState } from 'react';
import { useUploadImage } from '@/api/cats/upload-image';

export const ImageUploader = () => {
  const [file, setFile] = useState<File>();

  const uploadMutation = useUploadImage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setFile(file);
  };

  const handleUploadFile = () => {
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      {file && <button onClick={handleUploadFile}>submit</button>}
    </>
    //   <FileUploadRoot
    //     onFileChange={(e) => {
    //       console.log(e);
    //     }}
    //     accept={['image/png', 'image/jpeg']}
    //   >
    //     <FileUploadDropzone w="full" label="Drag and drop an image here" />
    //     <FileUploadList />
    //   </FileUploadRoot>
    // );
  );
};
