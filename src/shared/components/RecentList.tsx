import { useState } from 'react';

import RecentSearch from './RecentSearch';

interface recentSearchProps {
  searchValue?: string;
  setSearchValue?: (value: string) => void;

  directSearch?: (value: string) => void;
}

const RecentList = ({ setSearchValue, directSearch }: recentSearchProps) => {
  const [queryList, setQueryList] = useState(['모다미육', '만경상회', '재즈 라운지', '브네']);

  const rednerSearchQuery = () =>
    queryList.map((query, idx) => (
      <RecentSearch
        key={idx}
        text={query}
        directSearch={directSearch}
        setSearchValue={setSearchValue}
        handleRemove={() => setQueryList((prev) => prev.filter((x) => x !== query))}
      />
    ));

  return <div className="mt-4 flex w-full flex-col items-center">{rednerSearchQuery()}</div>;
};
export default RecentList;
