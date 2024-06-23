"use client";
import React, { useState } from "react";
import { SignedIn, useSignIn, useUser } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const redirect = params.get("redirect_url");

  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn, user } = useUser();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const submit = async (values: z.infer<typeof LoginSchema>) => {
    await signIn
      .create({
        identifier: values.email,
        password: values.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          console.log("complete");
          console.log(redirect);
          const url = new URL(redirect || "/");
          console.log(url.pathname);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err));
  };

  return (
    <div>
      {isSignedIn && (
        <div>
          <h1>Jsi již přihlášen</h1>
          <div>
            <p>
              <strong>Jméno:</strong> {user.fullName}
            </p>
          </div>
        </div>
      )}
      {!isSignedIn && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heslo</FormLabel>
                  <FormControl>
                    <div className="w-full flex gap-2">
                      <Input
                        {...field}
                        type={visible ? "text" : "password"}
                        placeholder="Heslo"
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? (
                          <IconEyeClosed className="h-5 w-5" />
                        ) : (
                          <IconEye className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
            <FormMessage />
          </form>
        </Form>
      )}
    </div>
  );
};

export default Login;
