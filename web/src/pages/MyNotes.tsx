import { useEffect } from 'react';

function MyNotes() {
  useEffect(() => {
    document.title = 'My notes';
  });
  return (
    <div>
      <h1>Notedly</h1>
      <p>My notes</p>
    </div>
  );
}

export default MyNotes;
