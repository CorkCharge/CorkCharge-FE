import { create } from 'zustand';

interface Profile {
  name: string;
  social_id: string;
  profile_image: string | null;
}
interface ProfileStore {
  profile: Profile | null;
  setProfile: (newProfile: Profile) => void;
}

const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (newProfile) => set({ profile: newProfile }),
}));

export default useProfileStore;
