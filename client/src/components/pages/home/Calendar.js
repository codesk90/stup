import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './example';
// import { useState } from 'react';

const Calendar = () => {
  // const [events, setEvents] = useState([]);

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
      select={(e) => createNewEvent(e)}
      initialEvents={INITIAL_EVENTS}
      eventClick={(e) => handleEventclick(e)}
      // eventContent={renderEventContent()}
      // eventsSet={(e) => handleEvents(e)}
    />
  );
};

export default Calendar;
