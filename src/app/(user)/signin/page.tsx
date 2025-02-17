import Container from "@/components/Container";
import SignInForm from "@/components/SignInForm";

const SignInPage = async () => {
  return (
    <Container className="py-20 flex flex-col items-center justify-center">
      <SignInForm />
    </Container>
  );
};

export default SignInPage;
