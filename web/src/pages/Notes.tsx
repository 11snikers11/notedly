import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import Note from '../components/Note';

interface MatchParams {
  id: string;
}

const GET_NOTE = gql`
  query Query($noteId: ID!) {
    note(_id: $noteId) {
      id
      content
      createdAt
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

function NotePage(props: RouteComponentProps<MatchParams>) {
  const noteId = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { noteId } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Note not found</p>;
  return <Note note={data.note} />;
}

export default NotePage;
