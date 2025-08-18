import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { footerIcons } from './FooterIcons';
import useFooterPropsStore from '@/shared/store/useFooterProps';
import apiClient from '@/shared/apis/apiClient';

const Footer = () => {
  const navigate = useNavigate();
  const { footerProps, setFooterProps } = useFooterPropsStore();

  useEffect(() => {
    apiClient
      .post(
        'suggestions',
        {
          title: '김창훈 포차 콜키지 비용 오류',
          content: '김창훈 포차 식당이 콜키지 비용이 공지된 내용과 달랐어요',
          category: 'CORKAGE_ERROR',
        },
        { params: { userId: 1 } }
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);

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
          className="flex flex-col items-center justify-center"
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
