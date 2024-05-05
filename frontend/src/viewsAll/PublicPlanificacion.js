import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

moment.locale('es');
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const { id } = useParams(); // Captura el ID de la URL
    const [planification, setPlanification] = useState({});
    const [events, setEvents] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5001/planification/${id}`)
            .then(response => {
                setPlanification(response.data || {});
                const fetchedEvents = response.data.events.map(event => ({
                    ...event,
                    start: moment(event.start).toDate(),
                    end: moment(event.end).toDate()
                }));
                setEvents(fetchedEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            {Object.keys(planification).length > 0 ? // Si el objeto está vacío, es decir, si no existe planificacion
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '90%',
                        margin: 3,
                        paddingTop: 3,
                        fontFamily: 'sans-serif',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#038cfc',
                        border: 2,
                        borderColor: '#038cfc',
                        borderRadius: 5,
                        borderStyle: 'solid',
                        height: '90vh'
                    }}
                >
                    <Typography variant="h4" component="h1" sx={{ height: '5%', width: '100%', color: '#038cfc', marginBottom: 5, fontFamily: 'sans-serif', fontSize: 30, fontWeight: 'bold' }}>
                        {planification.title || 'Cargando...'}
                    </Typography>
                    <Box
                        sx={{ height: '85%', width: '95%' }}
                    >
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%', width: '100%' }}
                            messages={{
                                next: "Siguiente",
                                previous: "Anterior",
                                today: "Hoy",
                                month: "Mes",
                                week: "Semana",
                                day: "Día",
                                agenda: "Agenda",
                                date: "Fecha",
                                time: "Hora",
                                event: "Evento",
                                noEventsInRange: "No hay eventos en este rango",
                                showMore: total => `+ Ver más (${total})`
                            }}
                        />
                    </Box>
                </Box>
                : <Typography>
                    No existe planificación con el ID proporcionado
                </Typography>}
        </div>
    );
};

export default MyCalendar;
