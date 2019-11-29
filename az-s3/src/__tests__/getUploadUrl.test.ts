import { getUploadUrl } from '../getUploadUrl';

const BUCKET = 'TEST_BUCKET';

jest.mock('uuid', () => ({
  v4: () => '666-666',
}));

jest.mock('aws-sdk', () => ({
  S3: jest.fn(() => ({
    getSignedUrl: (operation: string, params: any) => {
      const { Bucket, Key } = params;
      if (Bucket === BUCKET && operation === 'putObject') {
        return `http://localhost/${Key}`;
      }
      throw new Error('bucket or operation is invalid');
    },
  })),
}));

describe('getUploadUrl', () => {
  it('should return url', () => {
    expect(getUploadUrl(BUCKET, 'pdf')).toEqual({
      filekey: '666666.pdf',
      url: 'http://localhost/666666.pdf',
    });
  });
});
