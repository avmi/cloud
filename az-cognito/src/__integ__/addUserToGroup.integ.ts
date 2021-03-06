import AWS from 'aws-sdk';
import { adminFindUserByEmail, adminAddUserToGroup } from '../admin';
import { initEnvars } from '@cpmech/envars';

jest.setTimeout(20000);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//                                                                 //
//  the user pool name is:    az-cognito-testing                   //
//                                                                 //
//  NOTE: This user pool was created "by hand" in the AWS Console  //
//                                                                 //
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const envars = {
  USER_POOL_ID: '',
  USER_POOL_CLIENT_ID: '',
  BENDER_USERNAME: '',
  QUEUE_URL: '',
};

initEnvars(envars);

AWS.config.update({
  region: 'us-east-1',
});

const EMAIL = 'bender.rodriguez@futurama.space';

describe('addUserToGroup', () => {
  it('should add bender to travellers group', async () => {
    // get user
    const user = await adminFindUserByEmail(envars.USER_POOL_ID, EMAIL);
    expect(user.Username).toBe(envars.BENDER_USERNAME);
    if (!user.Username) {
      fail('cannot get Username');
    }

    // add user to group
    await adminAddUserToGroup(envars.USER_POOL_ID, user.Username, 'travellers', true);

    // check
    const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' });
    const res = await cognito
      .adminListGroupsForUser({
        UserPoolId: envars.USER_POOL_ID,
        Username: user.Username,
      })
      .promise();
    if (!res.Groups) {
      fail('cannot get groups');
    }
    const groupData = res.Groups.find(g => g.GroupName === 'travellers');
    if (!groupData) {
      fail('cannot get group data');
    }
    expect(groupData.GroupName).toBe('travellers');
  });
});
