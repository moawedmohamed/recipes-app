import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <p>Please login first.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}
