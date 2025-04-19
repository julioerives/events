export interface Event {
    eventId?: number;
    startDate: Date;
    endDate: Date;
    phoneNotifications: boolean;
    webNotificacions: boolean;
    minutesAdvice: number;
  }