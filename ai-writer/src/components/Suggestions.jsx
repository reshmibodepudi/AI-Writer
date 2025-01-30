import React from "react";

function Suggestions({ suggestions }) {
  const formatSuggestions = (text) => {
   
    let formattedText = text
      .replace(/\n\s*\n/g, "</p><p>") 
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
      .replace(/\*(.*?)\*/g, "<em>$1</em>") 
      .replace(/-\s(.*?)\n/g, "<li>$1</li>") 
      .replace(/<\/li>\s*<li>/g, "</li><li>");

  
    formattedText = formattedText.replace(/(<li>.*?<\/li>)/gs, "<ul>$1</ul>");

    return `<p>${formattedText}</p>`; 
  };

  return (
    <div className="suggestions">
      {suggestions ? (
        <div dangerouslySetInnerHTML={{ __html: formatSuggestions(suggestions) }} />
      ) : (
        <p>No suggestions yet. Type and click Generate🚀</p>
      )}
    </div>
  );
}

export default Suggestions;
