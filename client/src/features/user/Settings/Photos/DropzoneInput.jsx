import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
const DropzoneInput = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={'dropzone ' + (isDragActive && 'dropzone--isActive')}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon />
      <h4>Drop image here</h4>
    </div>
  );
};

export default DropzoneInput;
