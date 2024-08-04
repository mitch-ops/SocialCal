import React, { useState, useEffect } from 'react';
import api from '../api';

function Calendar() {
    const [activities, setActivites] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await api.get('activities/');
                setActivites(response.data);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div>
            <h1>Calendar</h1>
            <ul>
                {activities.map(activity => {
                    <li key={activity.id}>
                        {activity.title} ({new Date(activity.start_time).toLocaleString()} - {new Date(activity.end_time).toLocaleString()})
                    </li>
                })}
            </ul>
        </div>  
    );
}

export default Calendar;