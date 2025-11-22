import EditDots from './editDots.svg';

// SaveMarker icons (small)
import SaveMarker1 from './savemarker/SaveMarker1.svg';
import SaveMarker2 from './savemarker/SaveMarker2.svg';
import SaveMarker3 from './savemarker/SaveMarker3.svg';
import SaveMarker4 from './savemarker/SaveMarker4.svg';
import SaveMarker5 from './savemarker/SaveMarker5.svg';
import SaveMarker6 from './savemarker/SaveMarker6.svg';
import SaveMarker7 from './savemarker/SaveMarker7.svg';
import SaveMarker8 from './savemarker/SaveMarker8.svg';
import SaveMarker9 from './savemarker/SaveMarker9.svg';
import SaveMarker10 from './savemarker/SaveMarker10.svg';
import SaveMarker11 from './savemarker/SaveMarker11.svg';
import SaveMarker12 from './savemarker/SaveMarker12.svg';

const smallMarkers: Record<string, string> = {
  SaveMarker1,
  SaveMarker2,
  SaveMarker3,
  SaveMarker4,
  SaveMarker5,
  SaveMarker6,
  SaveMarker7,
  SaveMarker8,
  SaveMarker9,
  SaveMarker10,
  SaveMarker11,
  SaveMarker12,
};

type MyGroupProps = {
  iconName: string;
  name: string;
  count: number;
};

const MyGroup = ({ iconName, name, count }: MyGroupProps) => {
  const IconSrc = smallMarkers[iconName];

  return (
    <div className="flex w-full items-center border-b border-[#DBDDE1] py-4">
      {IconSrc && <img src={IconSrc} alt={iconName} className="h-[23px] w-[23px]" />}
      <span className="ml-[12px] text-[14px] font-[500] text-[#35353F]">{name}</span>
      <span className="ml-[8px] text-[12px] font-[500] text-[#9FA2AA]">{count}</span>
      <div className="ml-auto cursor-pointer">
        <img src={EditDots} alt="EditDots" />
      </div>
    </div>
  );
};

export default MyGroup;
