"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { bookingFormSchema, type BookingFormValues } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const Booking = () => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(data: BookingFormValues) {
    console.log(data)
    toast.success("Consultation request sent!", {
      description: "We will get back to you shortly to confirm your appointment.",
    })
    form.reset();
  }

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-rose-400/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-rose-400/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-thin tracking-tight mb-6">
            <span className="block">BOOK YOUR</span>
            <span className="block text-rose-300">TRANSFORMATION</span>
          </h2>
          <p className="text-xl font-light text-zinc-400">
            Each appointment is a carefully choreographed experience customized to your unique beauty architecture.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="border border-zinc-800 rounded-tl-[60px] p-8 hover:border-rose-500/30 transition-colors duration-300">
              <h3 className="text-2xl font-light mb-4">LOCATION</h3>
              <p className="text-zinc-300 font-light">21 Brutalist Avenue<br />Chrome District<br />NY 10001</p>
            </div>
            
            <div className="border border-zinc-800 rounded-tr-[60px] p-8 hover:border-rose-500/30 transition-colors duration-300">
              <h3 className="text-2xl font-light mb-4">HOURS</h3>
              <p className="text-zinc-300 font-light">
                Monday – Friday: 10AM – 8PM<br />
                Saturday: 10AM – 6PM<br />
                Sunday: By appointment only
              </p>
            </div>
            
            <div className="border border-zinc-800 rounded-bl-[60px] p-8 hover:border-rose-500/30 transition-colors duration-300">
              <h3 className="text-2xl font-light mb-4">CONTACT</h3>
              <p className="text-zinc-300 font-light">
                appointments@chromeblush.com<br />
                +1 (212) 555-0123
              </p>
            </div>
          </div>
          
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">Name</FormLabel>
                      <FormControl>
                        <Input className="w-full bg-transparent border-0 border-b border-zinc-700 rounded-none py-3 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-rose-300 transition-colors duration-300" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">Email</FormLabel>
                      <FormControl>
                        <Input className="w-full bg-transparent border-0 border-b border-zinc-700 rounded-none py-3 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-rose-300 transition-colors duration-300" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="treatment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">Treatment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-zinc-900 border border-zinc-700 py-3 px-2 h-auto focus:border-rose-300 focus:ring-rose-300 outline-none transition-colors duration-300 rounded-tr-[30px]">
                            <SelectValue placeholder="Select a treatment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 text-white border-zinc-700">
                          <SelectItem value="Chrome Revival">Chrome Revival</SelectItem>
                          <SelectItem value="Satin Surface">Satin Surface</SelectItem>
                          <SelectItem value="Architecture Lift">Architecture Lift</SelectItem>
                          <SelectItem value="Custom Experience">Custom Experience</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">Message</FormLabel>
                      <FormControl>
                        <Textarea className="w-full bg-transparent border-0 border-b border-zinc-700 rounded-none py-3 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-rose-300 transition-colors duration-300 h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="px-8 py-4 h-auto bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full hover:from-rose-400 hover:to-rose-500 transition-all duration-300 transform hover:-translate-y-0.5 w-full mt-8">
                  SCHEDULE CONSULTATION
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
