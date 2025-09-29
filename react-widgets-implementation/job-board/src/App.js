import { useState, useEffect } from 'react';

export default function App() {
  const [jobIds, setJobIds] = useState([])
  const [jobs, setJobs] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const rawData = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
        const data = await rawData.json()
        setJobIds(data)
      } catch (error) {
        console.error("Failed to fetch job IDs:", error);
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const nextIds = jobIds.slice(offset, offset + 6)
        const njobs = await Promise.all(
          nextIds.map(async (id) => {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            return response.json()
          })
        )
        setJobs((prev) => {
          const existingJobIds = new Set(prev.map((job) => job.id));
          const newUniqueJobs = njobs.filter(
            (newJob) => !existingJobIds.has(newJob.id)
          );
          return [...prev, ...newUniqueJobs];
        })
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      }
    }
    fetchData()
  }, [jobIds, offset])

  const jobList = jobs.map((job, i) => (
    <div style={{ backgroundColor: '#fff', border: '1px solid black', margin: '4px', padding: '4px' }} key={job.id}>
      <div style={{ color: '#ff6600' }}>{job.title}</div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>{job.by}</div>
        <div>{job.time}</div>
      </div>
    </div>
  ))

  return <div>
    <h2 style={{ color: '#ff6600' }}>Hacker News Jobs Board</h2>
    {jobList}
    <button onClick={() => setOffset((prev) => prev + 6)}>Load More</button>
  </div>;
}
