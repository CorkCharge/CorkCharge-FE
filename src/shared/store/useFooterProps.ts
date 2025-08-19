import { create } from 'zustand';

interface FooterPropsType {
  footerProps: number;
  setFooterProps: (props: number) => void;
}

const useFooterPropsStore = create<FooterPropsType>((set) => ({
  footerProps: 0,
  setFooterProps: (idx) => set({ footerProps: idx }),
}));

export default useFooterPropsStore;
