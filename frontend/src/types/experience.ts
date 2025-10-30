export interface ExperienceImage {
  url: string;
  filename: string;
}

export interface Experience {
    _id: string;
    title: string;
    description: string;
    location: string;
    image?: ExperienceImage;
    price?: number;
    duration: string;
    bookings?: {
    date: string;
    time: string;
    status: string;
  }[];
  createdAt?: string;
  updatedAt?: string; 
}

export interface ExperienceState {
  experiences: Experience[];
  selectedExperience: Experience | null;
  loading: boolean;
  error: string | null;

  fetchExperiences: () => Promise<void>;
  fetchExperienceById: (id: string) => Promise<void>;
}
