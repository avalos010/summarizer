import React from "react";
import Summarizer from "./summarizer/Summarizer";
import { summarize } from "./classify/pipeline";

export default function page() {
  return <Summarizer summarize={summarize} />;
}
