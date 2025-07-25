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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRegisterMutation } from "@/redux/apiClient/userApi";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
const Register = () => {
  const [registerHandler, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof registerSchema>) {
    try {
      const response = await registerHandler(formData).unwrap();
      console.log(response);
      if (response?.data?.isVerified === false) {
        router.push("/verify-email");
        return;
      }
      router.push("/");
      form.reset();
    } catch (err: unknown) {
      console.log(err);
    }
  }
  return (
    <div className="w-full py-20 min-h-screen">
      <div className="app-container flex items-center gap-28 justify-center">
        <div className="w-1/2">
          <Image
            src={"/auth.png"}
            alt="auth-image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto "
          />
        </div>
        <div className="w-1/2">
          <h2 className="font-main text-3xl text-surface-1">Get Started Now</h2>
          <p>Let’s create your account</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-[400px]"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Set your email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Set your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
