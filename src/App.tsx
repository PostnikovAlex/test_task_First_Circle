import { useState, useEffect } from 'react'
import './App.css'
import userRequests from './api/users/usersRequests';

import Table from './components/ui/Table/Table'
import TableRow from './components/ui/TableRow/TableRow'

import { User } from './types/api/user.types'
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const promises = Array(7)
          .fill('')
          .map(() => userRequests.getUsers());

        const results = await Promise.all(promises);
        const combinedUsers = results.flat();

        setUsers(combinedUsers);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDownloadJSON = (fileName: string) => {
    const jsonString = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();
  
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const headers = Object.keys(users[0]).join(',');
    const rows = users.map((user) => Object.values(user).join(',')); 
    const csvString = [headers, ...rows].join('\n'); 
  
    const blob = new Blob([csvString], { type: 'text/csv' }); 
    const url = URL.createObjectURL(blob); 
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table.csv'; 
    link.click();
  
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {error ?? <span>{error}</span>}
      <div>
        <Table headers={['name','city','company_name']}>
          {users.map((user, idx) => <TableRow key={idx} fields={['name','city','company_name']} data={user}></TableRow>)}
        </Table>
      </div>
      <button onClick={() => handleDownloadJSON('table')} disabled={isLoading}>Export as Json</button>
      <button onClick={handleDownloadCSV} disabled={isLoading}>Export as CSV</button>
    </>
  )
}

export default App
