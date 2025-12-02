const availableSlotsSection = document.getElementById('available-slots');
const bookingFormSection = document.getElementById('booking-form');
const bookingConfirmationSection = document.getElementById('booking-confirmation');

// fetch available slots from backend
async function fetchAvailableSlots() {
    try {
        const response = await axios.get('/api/available-slots');
        const data = response.data;
        const slotList = document.getElementById('slot-list');
        data.forEach(slot => {
            const li = document.createElement('li');
            li.textContent = `${slot.date} at ${slot.time} with ${slot.staff.name}`;
            slotList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchAvailableSlots();

// handle booking form submission
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', async event => {
    event.preventDefault();
    try {
        const formData = new FormData(bookingForm);
        const response = await axios.post('/api/book-appointment', formData);
        if (response.status === 200) {
            const bookingConfirmationMessage = document.createElement('p');
            bookingConfirmationMessage.textContent = `Appointment booked successfully! You will receive a confirmation email shortly.`;
            bookingConfirmationSection.appendChild(bookingConfirmationMessage);
        } else {
            throw new Error('Error booking appointment');
        }
    } catch (error) {
        console.error(error);
    }
});