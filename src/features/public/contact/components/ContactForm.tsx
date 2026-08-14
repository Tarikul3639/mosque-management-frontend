import { Mail, MessageSquareText, Send, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>আমাদের একটি বার্তা পাঠান</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">নাম</Label>

              <div className="relative">
                <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input id="name" placeholder="আপনার নাম" className="pl-9" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>

              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="আপনার ইমেইল"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">বিষয়</Label>

            <Input id="subject" placeholder="বার্তার বিষয়" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">বার্তা</Label>

            <div className="relative">
              <MessageSquareText className="absolute top-3 left-3 size-4 text-muted-foreground" />

              <Textarea
                id="message"
                rows={6}
                placeholder="আপনার বার্তা লিখুন..."
                className="resize-none pl-9"
              />
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            <Send className="mr-2 size-4" />
            বার্তা পাঠান
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
