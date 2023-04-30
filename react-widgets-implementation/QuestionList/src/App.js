import './App.css';
import React, {useState, useEffect} from 'react';

import _questions from "./mock_questions.json";
import _submissions from "./mock_submissions.json";

const QUESTIONS_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/questions';
const SUBMISSIONS_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/submissions';

function App() {
    const [questions, setQuestions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
        async function fetching() {
            // const [questionResponse, submissionResponse] = await Promise.all([
            //     fetch(QUESTIONS_API_BASE_URL, {
            //         mode: 'no-cors'
            //     }),
            //     fetch(SUBMISSIONS_API_BASE_URL, {
            //         mode: 'no-cors'
            //     })
            // ]);
            // console.log(questionResponse)
            // console.log(submissionResponse)
            // const _questions = await questionResponse.json();
            // const _submissions = await submissionResponse.json();
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
                                <div className='question'>
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
