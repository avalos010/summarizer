import { HfInference } from "@huggingface/inference";
import * as dotenv from "dotenv";

dotenv.config();

const inference = new HfInference(process.env.TOKEN);

export const summarize = async (text: string) => {
  "use server";
  const summary = await inference.summarization({
    model: "facebook/bart-large-cnn",
    inputs: text,
  });

  return summary.summary_text;
};
