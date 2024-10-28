import React from "react";
import { summarize } from "../classify/pipeline";

import FreeSummarizer from "./Summarizer";

export default function page() {
  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="text-2xl">Free Summarizer</h2>
      <FreeSummarizer summarize={summarize} />
    </div>
  );
}
