import { FileExtensionEnum, fileExtensionEnums, fileExtensions } from './fileTypeAndExt';

export const file2ext = (filename: string): string => {
  const array = filename.split('.');
  if (array.length < 2) {
    throw new Error('filename does not have extension');
  }
  const ext = array.pop();
  if (!ext) {
    throw new Error('filename does not have extension');
  }
  const e = ext.trim();
  if (!e) {
    throw new Error('filename does not have extension');
  }
  return e.toLowerCase();
};

export const ext2enum = (ext: string): FileExtensionEnum => {
  const extension = ext.trim().toUpperCase() as FileExtensionEnum;
  if (!fileExtensionEnums.includes(extension)) {
    throw new Error(`file extension must be in: ${fileExtensions.join(',')}`);
  }
  return extension;
};
