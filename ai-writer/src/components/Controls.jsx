import React from "react";

function Controls({ onGenerate, onRegenerate, onEdit, loading }) {
  return (
    <div>
      <button onClick={onGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <button onClick={onRegenerate} disabled={loading}>Regenerate</button>
      <button onClick={onEdit} disabled={loading}>Edit</button>
    </div>
  );
}

export default Controls;
