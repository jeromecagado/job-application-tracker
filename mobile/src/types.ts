// types.ts
export type ExternalJobDto = {
  id?: number;
  title: string | null;
  company: string | null;
  location: string | null;
  applyUrl: string | null;
  status?: string | null;
};

export type ApplyJobRequest = {
  position: string | null;
  company: string | null;
  location: string | null;
  applyUrl: string | null;
  notes?: string | null;
  source?: string | null;
};