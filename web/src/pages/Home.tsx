import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
  query Query($noteFeedCursor: String) {
    noteFeed(cursor: $noteFeedCursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

function Home() {
  useEffect(() => {
    document.title = 'Home page';
  });
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button onClick={() => fetchMore({ variables: { noteFeedCursor: data.noteFeed.cursor } })}>Load more...</Button>
      )}
    </>
  );
}

export default Home;
