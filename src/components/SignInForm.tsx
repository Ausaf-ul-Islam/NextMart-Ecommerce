import { signIn } from "@/auth";
import googleImage from "@/assets/googleImage.png";
import githubImage from "@/assets/githubImage.png";
import facebookImage from "@/assets/facebookImage.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/manageSession";
import Headings from "./Headings";

const SignInForm = async () => {
  const session = await getSession();

  // Redirect if user is already signed in
  if (session?.user) {
    redirect("/profile");
  }

  // OAuth Providers
  const providers = [
    { id: "google", name: "Google", image: googleImage },
    { id: "github", name: "GitHub", image: githubImage },
    { id: "facebook", name: "Facebook", image: facebookImage },
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <Headings title="Welcome to " subtitle="NexMart" />

      <p className="text-gray-500 text-center mt-1">
        Sign in to continue shopping with exclusive deals!
      </p>

      <div className="flex flex-col gap-4 mt-6">
        {providers.map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/" });
            }}
            className="flex items-center justify-center gap-3 border border-gray-300 font-semibold bg-white px-5 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300"
          >
            <Image src={provider.image} alt={`${provider.name} Logo`} className="w-6 h-6" />
            <button type="submit" className="text-gray-700">
              Continue with {provider.name}
            </button>
          </form>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        By signing in, you agree to our{" "}
        <span className="text-orange-500 cursor-pointer hover:underline">
          Terms & Privacy Policy
        </span>.
      </p>
    </div>
  );
};

export default SignInForm;
