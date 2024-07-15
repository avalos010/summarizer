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
    <div className="flex flex-col w-full">
      <div className=" flex flex-row gap-4 my-3 justify-center">
        <textarea
          className="textarea textarea-solid h-48 md:min-w-[40%] bg-slate-800"
          placeholder="Text to summarize"
          onChange={(e) => setToSummarize(e.target.value)}
        />

        {loading ? (
          <div className="flex justify-center items-center ml-4 ">
            <div className="spinner-dot-intermittent"></div>
          </div>
        ) : (
          <div className="h-48 p-3 md:w-[40%] bg-slate-800 rounded-md">
            <p className="text-xl">
              {summary ? summary : "Summary will show up here!"}
            </p>
          </div>
        )}
      </div>

      <div className="items-center flex justify-center">
        <button
          onClick={handleSummarization}
          className="btn btn-outline-primary w-auto"
        >
          Summarize
        </button>
      </div>
    </div>
  );
}

export default Summarizer;
