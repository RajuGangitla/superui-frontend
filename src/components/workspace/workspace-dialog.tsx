'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Globe } from 'lucide-react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScraperSchema, TScraper } from '@/types/scraper'
import { scrapeWebsiteApi } from '@/services/workspace'


export default function WorkspaceDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const form = useForm<TScraper>({
        resolver: zodResolver(ScraperSchema),
        defaultValues: {
            url: '',
        },
    })

    const { mutate: scrapeWebsite, isPending } =
        scrapeWebsiteApi({ reset: form.reset })

    const onSubmit = async (values: TScraper) => {
        await scrapeWebsite(values)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Open Scraper</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Scrape Website</DialogTitle>
                    <DialogDescription>
                        Enter a URL to scrape and analyze website content
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input placeholder="https://example.com" {...field} className="pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Scraping...
                                </>
                            ) : (
                                'Scrape Website'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

