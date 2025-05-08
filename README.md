# CPSC 362 Final Project: Productivity Calendar Website

This project is a feature-rich productivity calendar website designed to help users manage their time and tasks more effectively. With an intuitive and user-friendly interface, the platform encourages daily use by combining essential productivity tools in one place. Users can schedule and view events on specific dates, organize tasks using a built-in Kanban board, and create or edit personal notes. Additional tools like a weather search widget and a stopwatch enhance the overall experience, making it easier to stay focused and motivated. The primary goal is to promote productivity by helping users set, track, and achieve their goals with clarity and ease.

## Team 3

**Team Members:**
- David Nguyen  
- Johann Ocuaman  
- Joshua Andrada  

## Website Layout

The website consists of three main pages:
- **Main Webpage**
- **Kanban Tab**
- **Notes Tab**
- **Timer Tab**

---

## Main Webpage – User Instructions

### Calendar
- Click the left/right arrows at the top of the calendar to navigate between months.
- Enter a date in `MM/YYYY` format and click `Go` to jump to a specific month.
- Click the `Today` button to return to the current date.
- Click a date to view events:
  - Shows **"No Events"** if no events exist.
  - Displays event name, start time, and end time.
  - Click an event to delete it.
  - Click the `X` button to delete **all** events for that date.
- To create an event:
  - Click a date first.
  - Then click the `+` button (bottom-right).
  - Fill in the `Event Name`, `Event Time From`, and `Event Time To` fields.
  - Times must be in **24-hour format** (`00:00` to `24:00`).
  - Click `Add Event` to save it.

### Weather Search
- Type a city name into the input field and press `Enter` or click the search icon.
- Displays current temperature, "feels like", humidity, and wind speed.

### Dark Mode / Light Mode
- Click the **sun icon** to switch to dark mode.
- Click the **moon icon** to return to light mode.

### Navigation
- Click `Kanban` in the header to open the Kanban board.
- Click `Notes` in the header to open the notes section.
- Click `Timer` to go to the Timer tab.

---

## Kanban Tab – User Instructions

- Kanban has three task columns:
  - `Not Started`
  - `In Progress`
  - `Completed`

### Creating a Task
- Click `+ Add` in the desired column.
- A white task box appears.
- Click the box, type the task, then click outside to save.

### Editing a Task
- Click the task to edit it.
- Modify the text and click outside to save changes.

### Moving a Task
- Drag and drop the task into another column.

### Deleting a Task
- Double-click a task to delete it.

### Navigation
- Click `Calendar` in the header to return to the main page.
- Click `Notes` to go to the Notes tab.
- Click `Timer` to go to the Timer tab.

---

## Notes Tab – User Instructions

### Creating a Note
- Click `Create Notes`.
- A blank note appears.
- Click and type your content, then click outside to save.

### Editing a Note
- Click the note to edit it.
- Modify the content and click outside to save changes.

### Deleting a Note
- Click the **trash icon** next to the note to delete it.

### Navigation
- Click `Calendar` to return to the main page.
- Click `Kanban` to go to the Kanban tab.
- Click `Timer` to go to the Timer tab.

---

## Timer Tab – User Instructions

### Stopwatch
- Click `Start` to begin the timer.
- Click `Stop` to pause.
- Click `Reset` to reset to `00:00:00:00`.

### Navigation
- Click `Calendar` to return to the main page.
- Click `Kanban` to go to the Kanban tab.
- Click `Notes` to go to the Notes tab.