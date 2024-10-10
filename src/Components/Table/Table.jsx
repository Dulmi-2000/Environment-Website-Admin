import React from 'react';
import './table.css';

const ReusableTable = ({ columns, data, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
            {onDelete && <th>Actions</th>} {/* Conditionally render the Actions column */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={row._id || index}> {/* Use _id if available */}
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
                {onDelete && (
                  <td>
                    <button onClick={() => onDelete(row._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (onDelete ? 1 : 0)}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
