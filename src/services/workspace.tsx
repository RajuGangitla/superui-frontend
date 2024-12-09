import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import api from "@/lib/api"
import { IScrapeWebsiteProps, TScraper } from "@/types/scraper"


export const scrapeWebsiteApi = ({ reset }: IScrapeWebsiteProps) => {
    return useMutation({
        mutationFn: (data: TScraper) => api.post("/scrape_website", data),
        onSuccess: (res: AxiosResponse) => {
            reset()
            toast({
                title: "Webiste scrapped successfully",
                description: "Lets go",
            })
        },
        onError: ({ response }: any) => {
            toast({
                title: "Scrapping Failed",
                description: response?.data?.message || "An unexpected error occurred. Please try again.",
            });
        },
    })
}