import React from 'react';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledExcelUpload, Input, Label } from './styles';
import { ExcelUploadDisplayProps } from './types';

export default function ExcelUploadDisplay({ onUpload, selectedFile }: ExcelUploadDisplayProps) {
  return (
    <StyledExcelUpload>
      <Label>
        <FontAwesomeIcon icon={faFileExcel} />
        <Input
          type="file"
          value={selectedFile ? selectedFile[0].name : ''}
          id="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={(event) => onUpload(event.target.files)}
        />
      </Label>
    </StyledExcelUpload>
  );
}
