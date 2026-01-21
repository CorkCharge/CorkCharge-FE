import { cn } from '@/shared/utils/utils';

function TipDefaultImage({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-full w-full bg-[var(--primary)]', className)}>
      <svg
        // width="120"
        // height="186"
        viewBox="0 0 120 186"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 h-[90%] w-[74%]"
      >
        <path
          d="M97.242 0C115.715 18.4735 115.715 48.472 97.242 66.9454L33.4713 130.719C14.9986 112.245 14.9986 82.2467 33.4713 63.7733L97.242 0Z"
          fill="#DACBB6"
          fillOpacity="0.3"
        />
        <path
          d="M84.2535 95.6452C97.8053 109.198 97.8053 131.204 84.2535 144.756L37.4689 191.542C23.9171 177.99 23.9171 155.984 37.4689 142.432L84.2535 95.6452Z"
          fill="#DACBB6"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
}

export default TipDefaultImage;
