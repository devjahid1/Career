import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getStoredJobApplication } from '../../Utility/localStorage';


const AppliedJobs = () => {
    const [appliedJob, setAppliedJobs] = useState([]);
    const [displayJobs, setDisplayJobs] = useState([]);
    const jobs = useLoaderData();

    const handleJobsFilter = filter =>{
        if(filter === 'all'){
            setDisplayJobs(appliedJob);
        }
        else if(filter ==='remote'){
            const remoteJobs = appliedJob.filter(job => job.remote_or_onsite === 'Remote');
            setDisplayJobs(remoteJobs);
        }
        else if(filter === 'onsite'){
            const onsiteJobs = appliedJob.filter(job => job.remote_or_onsite === 'Onsite');
            setDisplayJobs(onsiteJobs)
        }
    }

    useEffect(()=>{
        const storedData = getStoredJobApplication();
        if(jobs.length > 0){
            const appliedJobs = jobs.filter(job => storedData.includes(job.id));
            // console.log(jobs, storedData, appliedJobs);
            setAppliedJobs(appliedJobs)
            setDisplayJobs(appliedJob)
            
        }
    },
    [jobs])


    return (
        <div>
            <details className="dropdown">
  <summary className="btn m-1">open or close</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li onClick={() => handleJobsFilter('all')}><a>All</a></li>
    <li onClick={() => handleJobsFilter('remote')}><a>Remote</a></li>
    <li onClick={() => handleJobsFilter('onsite')}><a>Onsite</a></li>
  </ul>
</details>

            <h2 className='ttext-2xl'>Jobs i applied: {appliedJob.length}</h2>

            <ul>
                {
                    displayJobs.map(job => <li key={job.id}>
                        <span>{job.job_title} : {job.company_name} : {job.remote_or_onsite}</span>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default AppliedJobs;