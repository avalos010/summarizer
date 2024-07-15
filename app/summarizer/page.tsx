import React from "react";
import { summarize } from "../classify/pipeline";

import Summarizer from "./Summarizer";

export default function page() {
  return <Summarizer summarize={summarize} />;
}
