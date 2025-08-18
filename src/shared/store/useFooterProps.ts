import { create } from 'zustand';

interface FooterPropsType {
  footerProps: number | null;
  setFooterProps: (props: number) => void;
}

const useFooterPropsStore = create<FooterPropsType>((set) => ({
  footerProps: 0,
  setFooterProps: (props: number) => set({ footerProps: props }),
}));

export default useFooterPropsStore;
