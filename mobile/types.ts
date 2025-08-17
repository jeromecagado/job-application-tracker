// types.ts
export type ExternalJobDto = {
  title: string | null;
  company: string | null;
  location: string | null;
  applyUrl: string | null;
};

export type ApplyJobRequest = {
  position: string | null;
  company: string | null;
  location: string | null;
  applyUrl: string | null;
  notes?: string | null;
  source?: string | null;
};