import ProfileHeader from "@/components/profile/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
	return (
		<>
			<ProfileHeader children={<Link href="/account"><Button size="sm">Edit Account</Button></Link>} />
		</>
	)
}