import './App.css';
import React, {useState, useEffect} from 'react';

// import _questions from "./mock_questions.json";
// import _submissions from "./mock_submissions.json";

const QUESTIONS_API_BASE_URL = 'https://ethereal-determined-gaura.glitch.me/algoexpert_fe_questions';
const SUBMISSIONS_API_BASE_URL = 'https://ethereal-determined-gaura.glitch.me/algoexpert_fe_submissions';

function App() {
    const [questions, setQuestions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
        async function fetching() {
            const [_questions, _submissions] = await Promise.all([
                fetch(QUESTIONS_API_BASE_URL).then(raw => raw.json()),
                fetch(SUBMISSIONS_API_BASE_URL).then(raw => raw.json())
            ]);
            setQuestions(_questions);
            setSubmissions(_submissions);
        }
        fetching();
    }, []);

    const questionSubmissioMap = {}
    submissions.forEach(({questionId, status}) => {
        questionSubmissioMap[questionId] = status;
    });

    const categories = new Map();
    questions.forEach(({id, name, category}) => {
        if (!categories.has(category)) {
            categories.set(category, []);
        }
        let status = 'unattempted';
        if (id in questionSubmissioMap) {
            status = questionSubmissioMap[id].toLowerCase().replace("_", '-');
        }
        categories.get(category).push({
            id,
            name,
            status
        })
    });
    // console.log(categories)
    
    const keys = Array.from(categories.keys())

    return (
      <>
        {keys.map((k, i) => {
            const Qs = categories.get(k)
            return (
                <div key={k} className='category'>
                    <h2> {k} - {Qs.filter(x => x.status === 'correct').length} / {Qs.length} </h2>
                    {
                        Qs.map((q, j) => {
                            return (
                                <div key={j} className='question'>
                                    <div className={`status ${q.status}`}></div>
                                    <h3>{q.name}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            )
        })}
      </>
    );
}

export default App;
