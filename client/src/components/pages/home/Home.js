import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Grid } from '@material-ui/core';

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={9} spacing={2}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          weekends={false}
          events={[
            { title: 'event 1', date: '2020-03-10' },
            { title: 'event 2', date: '2020-03-11' },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
