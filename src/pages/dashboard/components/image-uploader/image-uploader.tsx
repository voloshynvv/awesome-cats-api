import { useRef, useState } from 'react';
import { useUploadImage } from '@/api/cats/upload-image';
import { Box, Button, HStack, VisuallyHidden } from '@chakra-ui/react';
import { Alert } from '@/components/ui/alert';

export const ImageUploader = () => {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | 'idle'>('idle');

  const inputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadImage();

  const reset = () => {
    setFile(undefined);
    setPreview('');
    setStatus('idle');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFile(file);
    } else {
      URL.revokeObjectURL(preview);
      reset();
    }
  };

  const handleUploadFile = () => {
    if (file) {
      uploadMutation.mutate(file, {
        onError: () => {
          setStatus('error');
        },
        onSuccess: () => {
          reset();
          setStatus('success');

          setTimeout(() => {
            setStatus('idle');
          }, 2000);
        },
      });
    }
  };

  return (
    <Box spaceY="5">
      <label>
        <VisuallyHidden>Upload file</VisuallyHidden>
        <input
          aria-describedby="status"
          ref={inputRef}
          type="file"
          onChange={handleChange}
          accept="image/png, image/jpeg"
        />
      </label>

      {status === 'success' && <Alert id="status" role="alert" status="success" title="Image successfully uploaded" />}
      {status === 'error' && (
        <Alert id="status" role="alert" status="error" title="Something went wrong while uploading the image" />
      )}

      {file && (
        <HStack>
          <Button loading={uploadMutation.isPending} onClick={handleUploadFile}>
            Confirm
          </Button>

          <Button onClick={reset} variant="surface" colorPalette="red">
            Delete Preview
          </Button>
        </HStack>
      )}

      {preview && <img src={preview} alt="cat preview" />}
    </Box>
  );
};
