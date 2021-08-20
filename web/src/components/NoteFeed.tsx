import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { INote } from '../@types';
import Note from './Note';

interface Props {
  notes: Array<INote>;
}

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

function NoteFeed({ notes }: Props) {
  return (
    <div>
      {notes.map((note) => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`note/${note.id}`}>PermaLink</Link>
        </NoteWrapper>
      ))}
    </div>
  );
}

export default NoteFeed;
