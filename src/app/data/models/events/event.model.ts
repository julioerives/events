export interface Event {
    eventId?: number;
    startDate: Date;
    endDate: Date;
    phoneNotifications: boolean;
    webNotifications: boolean;
    minutesAdvice: number;
  }