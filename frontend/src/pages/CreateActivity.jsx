import React, { useState } from 'react';
import api from '../api';

function CreateActivity() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');

    const handleCreateActivity = async (e) => {
        e.preventDefault();
        // api post for all thoses attributes
        try {
            await api.post('api/activities/', {
                title,
                description,
                start_time: startTime,
                end_time: endTime,
                location,
            });
            alert('Activity created successfully');
        } catch (error) {
            console.error('Failed to create activity:', error);
        }
    };

    return (
        <form onSubmit={handleCreateActivity}>
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type='datetime-local'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <input
                type='datetime-local'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <input
                type='text'
                placeholder='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Create Activity</button>
        </form>
    );
}

export default CreateActivity;