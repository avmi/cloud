import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { initEnvars } from '@cpmech/envars';
import { sendEmail, receiveEmail, deleteEmail, extractCodeFromEmail } from '../index';

jest.setTimeout(20000);

AWS.config.update({
  region: 'us-east-1',
});

const envars = {
  DOMAIN: '',
  QUEUE_URL: '',
};

initEnvars(envars);

describe('sendEmail, receiveEmail and deleteEmail', () => {
  it('works', async () => {
    const sender = `tester@${envars.DOMAIN}`;
    const receiver = `tester+${v4()}@${envars.DOMAIN}`;

    console.log('1: sending email');
    await sendEmail(sender, [receiver], 'CODE', 'Key = 123-456');

    console.log('2: receiving email');
    const res = await receiveEmail(receiver, envars.QUEUE_URL);

    console.log('3: extracting code from email');
    const code = await extractCodeFromEmail(res.content, ['Key ='], 7);
    expect(code).toBe('123-456');

    console.log('4: deleting email');
    await deleteEmail(res.receiptHandle, envars.QUEUE_URL);

    console.log('5: done');
  });
});
