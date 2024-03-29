import React, { ChangeEvent, useEffect, useState } from 'react';
import ExcelUploadDisplay from './ExcelUploadDisplay';
import { postOnServer } from '../../../services/server';
import { addNotification, BulkUploadSuccessNotification } from '../../../services/notification';
import { playSuccessSound } from '../../../services/sounds';

export default function ExcelUpload() {
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  useEffect(onFilesUpdate, [selectedFile]);

  return (
    <ExcelUploadDisplay onUpload={handleUpload} selectedFile={selectedFile} />
  );

  function handleUpload(file: FileList | null) {
    if (file) {
      setSelectedFile(file);
    }
  }

  /**
   * Effect triggered when the selected file changes
   * If the file is not empty, trigger the save function
   */
  function onFilesUpdate() {
    if (selectedFile) {
      save(selectedFile);
    }

    return () => setSelectedFile(null);
  }

  /**
   * If files is not null
   * send the files to the server with a post method
   * at the endpoint /api/cards/upload
   * @param files the files to upload
   * @returns void
   */
  function save(files: FileList | null) {
    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);
      postOnServer(
        '/cards/upload/',
        formData,
      ).then((response) => {
        setSelectedFile(null);
        console.log(`Upload Successful : ${response.data} lines added`);
        // display success notification
        addNotification(BulkUploadSuccessNotification);
        playSuccessSound();
      }).catch((error) => {
        setSelectedFile(null);
        console.log(`Upload Failed : ${error}`);
      });
    }
  }
}
