import { HfInference } from "@huggingface/inference";
import * as dotenv from "dotenv";

dotenv.config();

const inference = new HfInference(process.env.TOKEN);

export const summarize = async (text: string) => {
  const summary = await inference.summarization({
    model: "google/pegasus-xsum",
    inputs: text,
  });

  return summary.summary_text;
};
