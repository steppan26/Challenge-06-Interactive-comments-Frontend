import './stylesheets/App.scss';
import Data from './data.json';
import CommentsList from './javascript/containers/commentsList';

function App() {
  return (
    <div className="App">
      <CommentsList data={Data} />
    </div>
  );
}

export default App;
