import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import api from '../api';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Calendar() {
    const [activities, setActivites] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await api.get('api/activities/');
                const formattedActivities = response.data.map(activity => ({
                    title: activity.title,
                    start: new Date(activity.start_time),
                    end: new Date(activity.end_time),
                }));
                setActivites(formattedActivities);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div>
            <h1>Calendar</h1>
            <BigCalendar
                localizer={localizer}
                events={activities}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>  
    );
}

export default Calendar;