import React, { useState } from 'react';
import api from '../api';

function CreateActivity() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');

    const handleCreateActivity = async (e) => {
        e.preventDefaults();
        // api post for all thoses attributes
        try {
            await api.post('activities/', {
                title,
                description,
                startTime,
                endTime,
                location,
            });
            alert('Activity create successfully');
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
                value={title}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Create Activity</button>
        </form>
    );
}

export default CreateActivity;