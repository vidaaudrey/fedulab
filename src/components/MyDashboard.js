// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { Tabs } from 'antd';
import { compose, withHandlers } from 'recompose';
import QueueAnim from 'rc-queue-anim';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaDescription from 'src/components/IdeaDescription';
import FullpageLoading from 'src/components/FullpageLoading';

import { UserDetailsQuery } from 'src/constants/appQueries';

const TabPane = Tabs.TabPane;

type Props = {
  userId: string,
  isSuperuser: boolean,
  name: string,
  email: string,
  picture: string,
  myIdeas: [Object],
  likedIdeas: [Object],
};
export function MyDashboard({
  userId,
  isSuperuser,
  name,
  email,
  picture,
  myIdeas,
  likedIdeas,
  ...rest
}: Props) {
  const nonNullIdeas = likedIdeas.filter(item => !!item);
  return (
    <div className="MyDashboard p-y-1 h-100">
      <div className="max-text-width bg-white p-a-3 m-x-auto min-vh">
        <div className="text-xs-center m-y-2">
          <img src={picture} width={125} style={{ borderRadius: '50%' }} />
          <h2 className="font-xl font-weight-200">Welcome{`, ${name}`}</h2>
          <p>{email}</p>
        </div>
        <Tabs>
          <TabPane tab="My Ideas" key="1">
            <QueueAnim>
              {myIdeas.map(idea => (
                <div key={idea.id} className="p-y-1s">
                  <IdeaDescription
                    idea={idea}
                    isSuperuser={isSuperuser}
                    userId={userId}
                    userEmail={email}
                  />
                </div>
              ))}
            </QueueAnim>
          </TabPane>
          <TabPane tab="My Liked Ideas" key="2">
            <QueueAnim>
              {nonNullIdeas.map(idea => (
                <div key={idea.id} className="p-y-1s">
                  <IdeaDescription
                    idea={idea}
                    isSuperuser={isSuperuser}
                    userId={userId}
                    userEmail={email}
                  />
                </div>
              ))}
            </QueueAnim>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default compose(
  graphql(UserDetailsQuery, {
    props: ({ data, data: { user } }) => ({
      data,
      isLoggedIn: !!user,
      userId: user && user.id,
      isSuperuser: user && user.isSuperuser,
      name: user && user.name,
      email: user && user.emailAddress,
      picture: user && user.picture,
      myIdeas: (user && user.myIdeas) || [],
      likedIdeas: (user && user.likes && _(user.likes).pluck('idea')) || [],
      dataFieldName: 'user',
    }),
  }),
  withGQLLoadingOrError(FullpageLoading),
  withHandlers({
    dosomething: () => () => {},
  }),
)(MyDashboard);
