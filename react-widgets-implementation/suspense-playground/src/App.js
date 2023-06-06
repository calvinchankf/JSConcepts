import { Suspense } from 'react';
import './App.css';
import Posts from './components/Posts';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
    return (
        <div className="App">
            <Suspense fallback={<LoadingIndicator/>}>
                <Posts />
            </Suspense>
        </div>
  );
}
export default App;
