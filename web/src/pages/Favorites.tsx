import { useEffect } from 'react';

function Favorites() {
  useEffect(() => {
    document.title = 'Favorites';
  });
  return (
    <div>
      <h1>Notedly</h1>
      <p>My favorites</p>
    </div>
  );
}

export default Favorites;
