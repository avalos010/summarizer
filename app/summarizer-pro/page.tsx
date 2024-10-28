import React from "react";
import { summarize } from "../classify/pipeline";
import ProSummarizer from "./Summarizer";

export default function page() {
  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="text-2xl">Pro Summarizer</h2>
      <ProSummarizer summarize={summarize} />
    </div>
  );
}
