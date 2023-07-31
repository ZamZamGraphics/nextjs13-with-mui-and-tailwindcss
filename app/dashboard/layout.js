import PrivateRoute from "../components/PrivateRoute";
export default function RootLayout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
