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
import {
  useLoginMutation,
  useVerifyOtpMutation,
} from "@/redux/apiClient/userApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { addUserToStore } from "@/redux/reducer/userReducer";
import { useState } from "react";

const loginSchema = z.object({
  phone: z.string().min(14, {
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login = () => {
  const [loginHandler, { isLoading }] = useLoginMutation();
  const [verifyOtpHandler, { isLoading: isOtpLoading }] =
    useVerifyOtpMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof loginSchema>) {
    try {
      const response = await loginHandler(formData).unwrap();
      if (response.success) {
        dispatch(addUserToStore(response.data));
        localStorage.setItem("token", response.data.token);
        router.push("/chat");
      }
    } catch (err: unknown) {
      console.log(err);
    }
  }
  async function onOtpSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const formData = {
        otp: otp,
        phone: phone,
      };
      const response = await verifyOtpHandler(formData).unwrap();
      if (response.success) {
        console.log(response.data);
        dispatch(addUserToStore(response.data));
        localStorage.setItem("token", response.data.token);
        router.push("/chat");
      }
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
          <p>Let’s create admin account</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-[400px]"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Set your phone" {...field} />
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
          <h2 className="font-main text-3xl text-surface-1">Get Started Now</h2>
          <p>Let’s create Customer account</p>

          <form>
            <input
              type="text"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" disabled={isOtpLoading} onClick={onOtpSubmit}>
              {isOtpLoading ? "Processing..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
