const StudentDetails = ({ student }) => {
    const { prn, attemptedTests, notAttemptedTests } = student;

    // Calculate the progress percentage based on attempted and not attempted tests
    const totalTests = attemptedTests + notAttemptedTests;
    const progressPercentage = totalTests ? (notAttemptedTests / totalTests) * 100 : 0;

    return (
        <div>
            <h2>Details for {prn}</h2>
            <p>Total Attempted Tests: {attemptedTests}</p>
            <p>Total Not Attempted Tests: {notAttemptedTests}</p>
            <p>Progress Percentage: {progressPercentage.toFixed(2)}%</p>
        </div>
    );
};
export default StudentDetails;