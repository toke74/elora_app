import React, { Fragment } from 'react';
import PostListItem from './PostListItem';

const PostList = ({ posts, user }) => {
  const postToArray = Array.from(posts);

  return (
    <Fragment>
      {posts &&
        postToArray.map((post) => (
          <PostListItem
            key={post._id}
            post={post}
            likes={post.like}
            user={user}
            comments={post.comments}
          />
        ))}
    </Fragment>
  );
};

export default PostList;
