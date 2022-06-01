import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

function Home() {
    const a = useContext(noteContext)
  return (
    <div>Hi I am the home section and the Author is {a.name} and he is from {a.class}</div>
  )
}

export default Home