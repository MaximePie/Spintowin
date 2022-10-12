type ExcelUploadProps = {

}
type ExcelUploadDisplayProps = ExcelUploadProps & {
  onUpload: (_file: FileList | null) => void
  selectedFile: FileList | null
}

export type { ExcelUploadDisplayProps, ExcelUploadProps };
