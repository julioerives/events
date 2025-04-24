export interface Event {
    eventName: string;
    eventId?: number;
    startDate: Date;
    endDate: Date;
    phoneNotifications: boolean;
    webNotifications: boolean;
    minutesAdvice: number;
  }