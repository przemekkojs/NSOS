import { apiClient } from "../client-v2";

export interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    courseCode: string;
    courseName: string;
    room: string;
    lecturerName: string | null;
    groupName: string;
  };
}

export interface CalendarParams {
  start_date?: string;
  end_date?: string;
  user_id?: string | number;
  [key: string]: unknown;
}

const baseUrl = `/api/teaching`;

export const calendarApi = {
  getEvents: (params?: CalendarParams) => {
    return apiClient.get<CalendarEvent[]>(`${baseUrl}/user-schedule/`, {
      query: params,
    });
  },
};
