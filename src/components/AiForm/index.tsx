"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAIResponse } from "../../server/ai";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  prompt: z.string().min(2).max(50),
});

// This example works by always using a new message, there is no message chaining, done as an example of using shadcn with zod and react hook form with server actions instead of api routes
export default function AiForm() {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await getAIResponse(values.prompt);
    setResponse(response);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AI Form</CardTitle>
          <CardDescription>
            Enter a prompt and get an AI response
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8 w-full"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your prompt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {response && (
        <>
          <p>AI Response</p>
          <p>{response}</p>
        </>
      )}
    </div>
  );
}
