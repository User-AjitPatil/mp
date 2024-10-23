// components/AdminResults.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:5000/api/v1/admin/routes/get-results`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setResults(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Results</h1>
            {results.length === 0 ? (
                <p style={styles.message}>No tests created.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.header}>PRN</th>
                            <th style={styles.header}>Marks</th>
                            <th style={styles.header}>Test Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index} style={styles.row}>
                                <td>{result.PRN}</td>
                                <td>{result.marks}</td>
                                <td>{result.testName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: 'auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    },
    header: {
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#4CAF50',
        color: 'white',
    },
    row: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    loading: {
        textAlign: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
    },
};

export default AdminResults;
