import React from "react";

function PromptInput({ value, onChange }) {
  return (
    <textarea
      placeholder="Type your resume, email, or post idea here..."
      value={value}
      onChange={onChange}
      rows="4"
    />
  );
}

export default PromptInput;
