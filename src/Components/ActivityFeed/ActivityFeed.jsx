import React from 'react';
import './activityFeed.css';

const activities = [
    { id: 1, message: 'New job application received from John Doe', timestamp: '2 hours ago' },
    { id: 2, message: 'Complaint ID 2345 resolved', timestamp: '5 hours ago' },
    { id: 3, message: 'New NGO registration from Green Earth Organization', timestamp: '1 day ago' },
];

const ActivityFeed = () => {
    return (
        <div className="activity-feed">
      
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        <span className="activity-message">{activity.message}</span>
                        <span className="activity-timestamp">{activity.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;
