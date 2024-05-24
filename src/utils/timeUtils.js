export const generateSlots = (dayOfWeek, startTime, endTime) => {
  const slots = [];
  const startHour = parseInt(startTime.split(':')[0]);
  const endHour = parseInt(endTime.split(':')[0]);
  const startMinute = parseInt(startTime.split(':')[1]);
  const endMinute = parseInt(endTime.split(':')[1]);

  const interval = 30 * 60 * 1000;

  const baseDate = new Date();
  const baseDay = baseDate.getUTCDay();
  const targetDay = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ].indexOf(dayOfWeek);
  const dayDiff = targetDay - baseDay;
  baseDate.setUTCDate(baseDate.getUTCDate() + dayDiff);

  const start = new Date(
    baseDate.toISOString().split('T')[0] + `T${startTime}Z`
  );
  const end = new Date(baseDate.toISOString().split('T')[0] + `T${endTime}Z`);

  for (let time = start; time <= end; time.setTime(time.getTime() + interval)) {
    const hour = time.getUTCHours();
    const minute = time.getUTCMinutes();

    if (
      (hour > startHour || (hour === startHour && minute >= startMinute)) &&
      (hour < endHour || (hour === endHour && minute <= endMinute))
    ) {
      slots.push({
        dayOfWeek,
        startTime: new Date(time),
        endTime: new Date(time.getTime() + interval),
      });
    }
  }

  return slots;
};

export const isValidTimeSlot = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return minutes === 0 || minutes === 30;
};
