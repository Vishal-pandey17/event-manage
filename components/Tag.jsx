"use client";
import { useRouter } from "next/navigation";

const Tag = ({ text }) => {
  const router = useRouter();
  
  // Handle click event
  const handleTagClick = () => {
    if (text) {
      const encodedTag = encodeURIComponent(text);
      router.push(`/events?tag=${encodedTag}`);
    }
  };

  // If no text is provided, don't render anything
  if (!text) return null;

  return (
    <div 
      onClick={handleTagClick}
      className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl w-fit px-4 py-2 text-center font-bold transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:cursor-pointer"
    >
      # {text}
    </div>
  );
};

export default Tag;
