export default function UserCell({ user }) {
	if (!user) return null;
	return (
		<>
			<p>
				{user.name.first} {user.name.last}
			</p>
			<img src={user.picture.thumbnail} alt="profile-pic"></img>
		</>
	);
}
