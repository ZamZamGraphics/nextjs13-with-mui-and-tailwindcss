import { redirect } from "next/navigation";
const auth = false;
export default function Home() {
  if (auth) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
