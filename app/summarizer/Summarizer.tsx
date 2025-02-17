"use client";

import Dropdown from "@/components/ripple/DropDown";
import React from "react";
import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
type SummarizeProps = {
  summarize: (text: string, length: number) => Promise<string>;
};

function Summarizer({ summarize }: SummarizeProps) {
  const [toSummarize, setToSummarize] = useState("");
  const [summaryLength, setSummaryLength] = useState(64);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarization = async () => {
    if (toSummarize) {
      setLoading(true);
      const result = await summarize(toSummarize, summaryLength);
      setSummary(result);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-col gap-4 my-3 justify-center p-5 items-center">
        <textarea
          className="textarea textarea-solid h-48 md:min-w-[40%] bg-slate-800 min-w-full md: w-full"
          placeholder="Text to summarize"
          onChange={(e) => setToSummarize(e.target.value)}
        />

        <Dropdown
          options={[
            { label: "Short", value: 64 },
            { label: "Medium", value: 128 },
            { label: "Long", value: 256 },
          ]}
          title="Summary Length"
          onSelect={(value) => {
            setSummaryLength(value as number);
          }}
        />

        {loading ? (
          <div className="flex justify-center items-center ml-4 ">
            <div className="spinner-dot-intermittent"></div>
          </div>
        ) : (
          <div className="h-fit p-3 md:w-[40%] bg-slate-800 rounded-md min-h-48">
            <p className="text-xl">
              {summary ? summary : "Summary will show up here!"}
            </p>
          </div>
        )}
      </div>

      <div className="items-center flex justify-center">
        <button
          onClick={handleSummarization}
          className="btn btn-primary w-auto"
        >
          <FaWandMagicSparkles className="mr-2" /> Generate Summary
        </button>
      </div>
    </div>
  );
}

export default Summarizer;
