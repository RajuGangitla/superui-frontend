import { UseFormReset } from "react-hook-form";
import { z } from "zod"


export const ScraperSchema = z.object({
    url: z.string().url({ message: "Please enter a valid URL" }),
})
export type TScraper = z.infer<typeof ScraperSchema>

export interface IScrapeWebsiteProps {
    reset: UseFormReset<TScraper>,
}