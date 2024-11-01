import React, { useRef, useState, useEffect } from "react";

const AutoResizeTextarea: React.FC = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "56px"; // Reset height to original to shrink on backspacing
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }
  }, [content]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange} // Hide scrollbar and disable manual resizing
      placeholder="Type something here..."
      className="w-1/2 h-14 bg-transparent outline-none border border-white text-white overflow-hidden resize-none rounded-xl px-4 py-3.5"
    />
  );
};

export default AutoResizeTextarea;