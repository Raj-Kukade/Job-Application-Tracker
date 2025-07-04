import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard({ setLoggedIn }) {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: '', link: '', title: '', status: 'Applied', date: '' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [editJobId, setEditJobId] = useState(null);
  const [editForm, setEditForm] = useState({ company: '', link: '', title: '', status: '', date: '' });

  useEffect(() => {
    axios.get('/jobs').then(res => setJobs(res.data));
  }, []);

  const isFormValid = () => { //form validate
    return form.company && form.link && form.title && form.status && form.date;
  };

  const isEditFormValid = () => {
    return editForm.company && editForm.link && editForm.title && editForm.status && editForm.date;
  };

  const addJob = async () => {
    if (!isFormValid()) return;

    try {
      await axios.post('/jobs/add', form);
      const res = await axios.get('/jobs');
      setJobs(res.data);
      setForm({ company: '', link: '', title: '', status: 'Applied', date: '' });
      toast.success('Job added successfully ✅');
    } catch (err) {
      toast.error('Failed to add job ❌');
    }
  };

  const deleteJob = async id => {
    try {
      await axios.delete(`/jobs/${id}`);
      setJobs(jobs.filter(j => j._id !== id));
      toast.success('Job deleted');
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  const startEdit = (job) => {
    setEditJobId(job._id);
    setEditForm({
      company: job.company,
      link: job.link,
      title: job.title,
      status: job.status,
      date: job.date ? new Date(job.date).toISOString().substring(0, 10) : ''
    });
  };

  const updateJob = async () => {
    if (!isEditFormValid()) return;

    try {
      await axios.put(`/jobs/${editJobId}`, editForm);
      const res = await axios.get('/jobs');
      setJobs(res.data);
      setEditJobId(null);
      toast.success('Job updated ✅');
    } catch (err) {
      toast.error('Failed to update job ❌');
    }
  };

  const filteredJobs = filterStatus === 'All' ? jobs : jobs.filter(j => j.status === filterStatus);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Jobs🥷</h1>
        <button
          onClick={() => {
            axios.post('/auth/logout');
            setLoggedIn(false);
          }}
          className="text-red-500 text-xl font-bold"
        >
          Logout👩‍💻
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input">
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Job List */}
        <div className="bg-white p-4 rounded shadow h-fit max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Applied Jobs</h2>
          {filteredJobs.map(job => (
            <div key={job._id} className="border-b pb-2 mb-2">
              {editJobId === job._id ? (
                <div>
                  <input
                    value={editForm.company}
                    placeholder="Company"
                    onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                    className="input"
                  />
                  <input
                    value={editForm.link}
                    placeholder="Link"
                    onChange={e => setEditForm({ ...editForm, link: e.target.value })}
                    className="input"
                  />
                  <input
                    value={editForm.title}
                    placeholder="Position"
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="input"
                  />
                  <select
                    value={editForm.status}
                    onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                    className="input"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                  </select>
                  <input
                    value={editForm.date}
                    type="date"
                    onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                    className="input"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={updateJob} className="btn">Save</button>
                    <button onClick={() => setEditJobId(null)} className="btn bg-gray-300">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{job.company} - {job.title}</p>
                    <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
                      Career Page
                    </a>
                    <p className="text-sm text-gray-600">Status: {job.status}</p>
                    <p className="text-sm text-gray-500">
                      Applied on: {new Date(job.date).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => startEdit(job)} className="text-sm text-green-500">Edit✏️</button>
                    <button onClick={() => deleteJob(job._id)} className="text-sm text-red-500">Delete❌</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Job Form */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Add Job</h2>
          <input
            value={form.company}
            placeholder="Company"
            onChange={e => setForm({ ...form, company: e.target.value })}
            className="input"
          />
          <input
            value={form.link}
            placeholder="Link"
            onChange={e => setForm({ ...form, link: e.target.value })}
            className="input"
          />
          <input
            value={form.title}
            placeholder="Position"
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="input"
          />
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className="input"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>
          <input
            value={form.date}
            type="date"
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="input"
          />
          <button
            onClick={addJob}
            className={`btn mt-2 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid()}
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
