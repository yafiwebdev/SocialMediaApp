import * as React from 'react';

import { Topbar, Post } from '../../components/SocialMediaApp/components';
import { IUserFeed } from '../../types';

const user: IUserFeed = {
  username: 'John Doe',
  email: 'jDoe@mail.com',
  post: [
    {
      username: 'Jane Doe',
      url:
        'https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80',
      caption: 'Some caption!',
      interactions: [
        {
          likes: ['Jane', 'Daniel', 'Marta'],
          comments: [
            {
              commenter: 'Alex',
              comment: 'Some relevant commet!',
            },
          ],
        },
      ],
    },
    {
      username: 'Sarah Doe',
      url:
        'https://images.unsplash.com/photo-1605441065768-a2798213ac26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
      caption: 'Some other caption!',
      interactions: [
        {
          likes: ['Max', 'Daniel'],
          comments: [
            {
              commenter: 'Alex',
              comment: 'Another some relevant commet!',
            },
          ],
        },
      ],
    },
  ],
};

const Feed: React.FC<any> = () => {
  const posts = user.post.map((userPost, idx) => (
    <Post key={idx} user={userPost} />
  ));

  return (
    <>
      <Topbar />
      {posts.length > 0 ? posts : null}
    </>
  );
};

export default Feed;
