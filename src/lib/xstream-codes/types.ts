export type PlayerApiConfig = {
  baseUrl: string;
  auth: { username: string; password: string };
};

export type Filter = {
  category_id?: string;
  vod_id?: string | number;
  series_id?: string | number;
  stream_id?: any;
  limit?: any;
  name?: string;
};

export interface Category {
  category_id: number;
  category_name: string;
  parent_id: number;
  streams: Stream[];
}

export type Stream = {
  added: Date;
  category_id: number;
  category_name: string;
  container_extension: string;
  custom_sid: string;
  direct_source: string;
  epg_channel_id: string;
  stream_icon: string;
  stream_id: number;
  url: string;
  name: string;
  num: number;
  rating: number;
  rating_5based: number;
  tv_archive: number;
  tv_archive_duration: number;
  stream_type: string;
};
