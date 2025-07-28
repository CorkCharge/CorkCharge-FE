// import React from 'react';
import './tip.css';

const Curation = () => {
  return (
    <div>
      <article className="flex gap-4">
        <div className="flex flex-col gap-2">
          <img src="https://placehold.co/176X173" className="article" />
          <img src="https://placehold.co/176X234" className="article" />
          <img src="https://placehold.co/176X259" className="article" />
        </div>
        <div className="flex flex-col gap-2">
          <img src="https://placehold.co/175X212" className="article" />
          <img src="https://placehold.co/176X207" className="article" />
          <img src="https://placehold.co/176X172" className="article" />
          <img src="https://placehold.co/176X172" className="article" />
        </div>
      </article>
    </div>
  );
};

export default Curation;
