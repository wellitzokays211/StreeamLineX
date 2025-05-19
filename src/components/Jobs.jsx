import { Alert, Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/quotation/get_all_jobs');
        setJobs(response.data.jobs);
      } catch (err) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/employee/get');
        setEmployees(response.data.employees);
      } catch (err) {
        setError('Error fetching employees');
      }
    };

    fetchJobs();
    fetchEmployees();
  }, []);

  const handleOpenAssignModal = (job) => {
    setSelectedJob(job);
    setSelectedEmployees([]);
    setShowAssignModal(true);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedJob(null);
  };

  const handleAssignEmployees = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/jobs/assign', {
        jobId: selectedJob.id,
        employeeIds: selectedEmployees,
      });

      if (response.data.success) {
        handleCloseAssignModal();
      }
    } catch (err) {
      setError('Error assigning employees');
    }
  };

  const handleViewAssignedEmployees = async (job) => {
    setSelectedJob(job);
    setShowViewModal(true);
    try {
      const response = await axios.post(`http://localhost:4000/api/jobs/assigned`, { jobId: job.id });
      setAssignedEmployees(response.data.employees);
    } catch (err) {
      setError('Error fetching assigned employees');
    }
  };


  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setAssignedEmployees([]);
  };

  return (
    <div className="container mt-5">
      <h2>Job Management</h2>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && jobs.length === 0 && (
        <Alert variant="info">No jobs available.</Alert>
      )}

      {!loading && !error && jobs.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Job Name</th>
              <th>Start Date</th>
              <th>Finish Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.job_name}</td>
                <td>{new Date(job.start_date).toLocaleDateString()}</td>
                <td>{job.finish_date ? new Date(job.finish_date).toLocaleDateString() : 'N/A'}</td>
                <td>{job.status}</td>
                <td>
                  <Button variant="success" onClick={() => handleOpenAssignModal(job)}>Assign</Button>{' '}
                  <Button variant="info" onClick={() => handleViewAssignedEmployees(job)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Assign Employees Modal */}
      <Modal show={showAssignModal} onHide={handleCloseAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Employees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {employees.map((emp) => (
              <Form.Check
                key={emp.id}
                type="checkbox"
                label={`${emp.name} - ${emp.position}`}
                value={emp.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedEmployees([...selectedEmployees, emp.id]);
                  } else {
                    setSelectedEmployees(selectedEmployees.filter(id => id !== emp.id));
                  }
                }}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAssignModal}>Close</Button>
          <Button variant="primary" onClick={handleAssignEmployees}>Assign</Button>
        </Modal.Footer>
      </Modal>

      {/* View Assigned Employees Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assigned Employees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {assignedEmployees.length > 0 ? (
            <ul>
              {assignedEmployees.map((emp) => (
                <li key={emp.id}>{emp.name} - {emp.position}</li>
              ))}
            </ul>
          ) : (
            <p>No employees assigned.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobManagement;
