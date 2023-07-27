import { useEffect, useState } from "react";
import { ConditionalRender } from "../../functional.component";
import { profilePictureUrl } from "../constans";
import { Spinner } from "./Spinner";
import { ProfileImageProp } from "./types";

export function ProfileImage({ user }: ProfileImageProp) {
	const [userImage, setUserImage] = useState({
		user: {
			image: "",
		},
		loading: true,
	});

	useEffect(() => {
		fetch(`${profilePictureUrl}/${user?.github}`).then((res) => {
			setUserImage({
				user: { image: res.url },
				loading: false,
			});
		});
	}, []);

	return (
		<>
			<ConditionalRender predicate={userImage.loading}>
				<Spinner />
			</ConditionalRender>
			<ConditionalRender predicate={!userImage.loading}>
				<img
					className="w-[32px] h-[32px] rounded-full"
					src={userImage.user.image}
					alt={user?.name}
				/>
			</ConditionalRender>
		</>
	);
}
