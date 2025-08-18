import { useNavigate } from 'react-router-dom';

import { footerIcons } from './FooterIcons';
import useFooterPropsStore from '@/shared/store/useFooterProps';

const Footer = () => {
  const navigate = useNavigate();
  const { footerProps, setFooterProps } = useFooterPropsStore();

  const setPropsIdx = (idx: number, path: string) => {
    if (footerProps === idx || !path) return; // 이미 해당 페이지에 있는경우

    setFooterProps(idx);
    navigate(path);
  };

  const renderFooter = () =>
    footerIcons.map((item, idx) => {
      const curColor = idx === footerProps ? 'var(--primary)' : 'var(--gray-4)';

      return (
        <div
          key={item.name}
          className="flex flex-col items-center justify-center bg-white"
          onClick={() => setPropsIdx(idx, item.path)}
        >
          {item.icon(curColor)}
          <span className={`text-[9px] font-medium text-[${curColor}]`}>{item.name}</span>
        </div>
      );
    });

  return <div className="grid h-[60px] grid-cols-5 justify-center">{renderFooter()}</div>;
};

export default Footer;
