import './stylesheets/App.scss';
import Data from './data.json';
import CommentsList from './javascript/containers/comments_list';

function App() {
  return (
    <div className="App">
      <CommentsList data={Data} />
    </div>
  );
}

export default App;
