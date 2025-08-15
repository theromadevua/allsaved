import React from 'react';
import { PostsPageContent } from '../components/PostPageContent/PostPageContent';
import { usePostsPage } from '../hooks/usePostsPage';

const Posts: React.FC = () => {
  const adminPostsProps = usePostsPage();
  return <PostsPageContent {...adminPostsProps} />;
};

export default Posts;
