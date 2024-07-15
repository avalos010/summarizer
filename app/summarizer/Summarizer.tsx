"use client";

import React from "react";
import { useState } from "react";

type SummarizeProps = {
  summarize: (text: string) => Promise<string>;
};

function Summarizer({ summarize }: SummarizeProps) {
  const [toSummarize, setToSummarize] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarization = async () => {
    if (toSummarize) {
      setLoading(true);
      const result = await summarize(toSummarize);
      setSummary(result);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className=" flex flex-row gap-4 my-3 justify-around">
        <textarea
          className="textarea textarea-solid h-48"
          placeholder="Text to summarize"
          onChange={(e) => setToSummarize(e.target.value)}
        />

        {loading ? (
          <div className="flex justify-center items-center ml-4">
            <div className="spinner-dot-intermittent"></div>
          </div>
        ) : (
          <textarea
            className="textarea textarea-solid h-48"
            placeholder="Summarized text"
            value={summary}
            disabled
          />
        )}
      </div>

      <button onClick={handleSummarization} className="btn btn-outline-primary">
        Summarize
      </button>
    </div>
  );
}

export default Summarizer;
