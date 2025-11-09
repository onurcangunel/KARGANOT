export const EVENTS = {
  page_view: 'page_view',
  login: 'login',
  signup: 'sign_up',
  search: 'search',
  note_download: 'note_download',
  note_upload: 'note_upload',
  rating_submit: 'rating_submit',
  report_submit: 'report_submit',
  profile_update: 'profile_update',
} as const;

export type EventName = typeof EVENTS[keyof typeof EVENTS];
