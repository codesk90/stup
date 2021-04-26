import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './example';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import React, { useState } from 'react';
// import { useState } from 'react';

const Calendar = () => {
  // const [events, setEvents] = useState([]);
  const [ selectedEvent, setSelectedEvent ] = useState(null);

  const handleEventclick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  // const handleEvents = (events) => {
  //   setEvents({ currentEvents: events });
  // };

  // const renderEventContent = (eventInfo) => {
  //   console.log(eventInfo);
  // };

  const createNewEvent = (newEvent) => {
    let title = prompt(`Please enter a new title for your event`);
    let calenderApi = newEvent.view.calendar;

    // clear date selection
    calenderApi.unselect();

    if (title) {
      calenderApi.addEvent({
        id: createEventId(),
        title,
        start: newEvent.startStr,
        end: newEvent.endStr,
        allDay: newEvent.allDay,
      });
    }
  };

  return (
    <React.Fragment>
      <Grid item xs={12} md={9}>
        <Paper>
          <Box p={2}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              editable={true}
              selectable={true}
              selectMirror={true}
              select={(e) => {
                // createNewEvent(e)
                console.log(e);
                setSelectedEvent(e);
              }}
              initialEvents={INITIAL_EVENTS}
              eventClick={(e) => handleEventclick(e)}
              // eventContent={renderEventContent()}
              // eventsSet={(e) => handleEvents(e)}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper>
          <Box p={2}>
            {/* Hello */}
            {selectedEvent ? 
            <>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <Button
                  type="button"
                  onClick={e => {
                    // console.log(selectedEvent.view.getCurrentData());
                    // console.log(selectedEvent.view.getOption());
                    createNewEvent(selectedEvent)
                  }}
                >
                  Create new event
                </Button>
                <Button
                  type="button"
                  onClick={e => {
                    setSelectedEvent(null);
                  }}
                >X</Button>
              </div>
              <p>{selectedEvent.startStr.replace(/-/g, "/")}</p>
              {/* <p>{selectedEvent.startStr + " - " + selectedEvent.endStr}</p> */}
            </> : "Hello"}
          </Box>
        </Paper>
      </Grid>
      {/* <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        select={(e) => {
          // createNewEvent(e)
          console.log(e);
        }}
        initialEvents={INITIAL_EVENTS}
        eventClick={(e) => handleEventclick(e)}
        // eventContent={renderEventContent()}
        // eventsSet={(e) => handleEvents(e)}
      /> */}
    </React.Fragment>
  );
};

export default Calendar;
